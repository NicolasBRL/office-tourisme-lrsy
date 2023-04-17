import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios";
import Logo from "../../components/Logo";
import PlaceMap from "../../components/Map";

const Article = () => {
  const articleId = useParams().article;
  const [article, setArticle] = useState([]);

  const getArticle = async () => {
    console.log(articleId)

    await axiosClient.get(`/blog/${articleId}`).then((res) => {
      console.log(res.data)
      setArticle(res.data.article);
    });
  };

  useEffect(() => {
    getArticle()
  }, []);

  return (
    <div>
      <header id="header" className="z-30 fixed w-full bg-white">
        <div className="px-8 mx-auto xl:px-5 container">
          <div className="flex items-center justify-between h-20 border-b-2 border-gray-100 md:justify-start md:space-x-6">
            <div className="inline-flex">
              <Logo className="w-20" />
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 mx-auto xl:px-5 container max-w-5xl pt-[100px]">
        <img
          src={`http://localhost:8000/storage/uploads/${article.url_image}`}
          className="h-80 w-full object-cover rounded-lg mb-6"
        />
        
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
          {article.titre}
        </h1>

        <div className="content" dangerouslySetInnerHTML={{__html: article.content}}></div>

        <hr className="w-32 border-2 border-primary-500 my-6 mx-auto" />

        <div className="w-full mb-4" id="map-container">
          {article.lieu && (
            <PlaceMap
              markers={[{longitude: article.lieu.longitude, latitude: article.lieu.latitude}]} 
            />
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Article;
