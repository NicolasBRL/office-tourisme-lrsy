import React, { useEffect, useRef, useState } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axiosClient from "../../axios";
import { convertToHTML } from 'draft-convert';
import htmlToDraft from 'html-to-draftjs';
import { useNavigate, useParams } from "react-router-dom";

const EditArticles = () => {
  const article = useParams().article;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [lieux, setLieux] = useState([]);
  const [selectedLieu, setSelectedLieu] = useState();
  const [image, setImage] = useState("");
  const titreRef = useRef();
  const slugRef = useRef();
  const navigate = useNavigate();

  const getArticle = async () => {
    await axiosClient
      .get(`/articles/${article}`)
      .then((res) => {
        
        titreRef.current.value = res.data.article.titre;
        slugRef.current.value = res.data.article.slug;
        setSelectedLieu(res.data.article.lieu_id)
        
        const blocksFromHtml = htmlToDraft(res.data.article.content);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

        setEditorState(EditorState.createWithContent(contentState));
      })

      .catch((error) => {
        console.log(error);
      });
  }

  const getLieux = async () => {
    await axiosClient.get("/lieux").then((res) => {
      setLieux(res.data.lieux);
    });
  };


  const editArticle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", 'PUT');
    formData.append("titre", titreRef.current.value);
    formData.append("slug", slugRef.current.value);
    formData.append("content", convertToHTML(editorState.getCurrentContent()));
    formData.append("url_image", image);
    formData.append("lieu_id", selectedLieu);

    await axiosClient
      .post(`/articles/${article}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(response => (response.data.success) ? navigate('/dashboard/articles') : console.log(response.data))
      .catch((e) => {
        console.log(e);
      });
  }

  const handleLieuChange = (e) => {
    const { value } = e.target;
    setSelectedLieu(value);
  }

  const handleImageChange = (e) => {
    const { files } = e.target;
    setImage(files[0]);
  }

  // Récupère les lieux
  useEffect(() => {
    getArticle();
    getLieux();
  }, []);

  return (
    <form className="p-6 bg-white border border-gray-200 rounded-lg my-5"
      onSubmit={editArticle}
    >
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Titre
        </label>
        <input
          type="text"
          name="nom"
          ref={titreRef}
          onChange={(e) => {
            slugRef.current.value = e.target.value
              .toLowerCase()
              .trim()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/[^\w\s-]/g, "")
              .replace(/[\s_-]+/g, "-")
              .replace(/^-+|-+$/g, "")
              ;
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Slug
        </label>
        <input
          type="text"
          name="slug"
          ref={slugRef}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
        />
      </div>
      <div className="mb-6">
        <Editor
          editorState={editorState}
          wrapperClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-primary-500 focus:border-primary-500 block w-full overflow-hidden wysiwyg-editor-container"
          editorClassName="p-2.5"
          onEditorStateChange={setEditorState}
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Lieu
        </label>
        <select onChange={handleLieuChange} value={selectedLieu} defaultValue={selectedLieu} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
          <option value="-1">Choisir un lieu</option>
          {lieux.map((lieu, i) => (
            <option value={lieu.id} key={lieu.id}>{lieu.nom}</option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Photo
        </label>
        <input 
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"type="file" />
      </div>

      <button className="inline-flex items-center text-white focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 ml-auto bg-primary-600 hover:bg-primary-700 focus:ring-primary-700 border-primary-700">
        Modifier
      </button>
    </form>
  );
}

export default EditArticles