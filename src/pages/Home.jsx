import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios";
import Logo from "../components/Logo";
import LeftColumn from "../Home/LeftColumn";
import RightColumn from "../Home/RightColumn";

const Home = () => {
  const [lieux, setLieux] = useState([]);
  const [articles, setArticles] = useState([]);
  const mapRef = useRef(null);

  const displayLieux = async () => {
    await axiosClient.get("/home").then((res) => {
      setLieux(res.data.lieux);
    });
  };

  const displayArticles = async () => {
    await axiosClient.get("/blogs").then((res) => {
      setArticles(res.data.articles);
    });
  };

  useEffect(() => {
    displayLieux();
    displayArticles();
  }, []);

  return (
    <div id="home" className="h-screen">
      <header id="header" className="z-30 fixed w-full bg-white">
        <div className="px-8 mx-auto xl:px-5 container">
          <div className="flex items-center justify-between h-20 border-b-2 border-gray-100 md:justify-start md:space-x-6">
            <div className="inline-flex">
              <Logo className="w-20" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex px-8 mx-auto xl:px-5 container pt-[100px] items-start">
        <LeftColumn lieux={lieux} mapRef={mapRef} />
        <RightColumn lieux={lieux} mapRef={mapRef} />
      </div>

      <div className="px-8 mx-auto xl:px-5 container mt-8">
        <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Nos articles
        </h2>
        <hr className="w-32 border-2 border-primary-500 mb-6" />

        <div className="flex">
          <div className="w-1/3">
            {articles.map((article) => (
              <div
                key={article.id}
                className="max-w-sm bg-white shadow mb-4 rounded-lg cursor-pointer"
              >
                <div className="h-48 block">
                  <img
                    src={`http://localhost:8000/storage/uploads/${article.url_image}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="px-5 py-2">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                    {article.titre}
                  </h5>
                  <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {article.lieu.nom}
                  </span>

                  <Link to={`/blog/${article.slug}`} className="block mt-6 px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 ">
                      Lire
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
