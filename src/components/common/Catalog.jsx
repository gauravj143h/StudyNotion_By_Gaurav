import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import apiConnector from "../../services/apiconnector";
import { categories } from "../../services/api";
import PageAndComponets from "../../services/operations/PageAndComponets";
import { useParams } from "react-router-dom";
import CourseSlider from "../core/MyCourse/CourseSlider";
import Course_Card from "../core/MyCourse/Course_Card";

const Catalog = () => {
  const { catelogName } = useParams();
  const [catalogData, setcateloData] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        const dataArray = Array.isArray(res?.data) ? res.data : res?.data?.data;

        const category_id = dataArray?.find(
          (ct) =>
            ct.name.split(" ").join("-").toLowerCase() ===
            catelogName?.toLowerCase()
        )?._id;

        setCategoryId(category_id || null);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    getCategories();
  }, [catelogName]);

  // Fetch category details
  useEffect(() => {
    const getCategoriesDetails = async () => {
      if (!categoryId) return;
      try {
        const res = await PageAndComponets(categoryId);
        setcateloData(res);
      } catch (err) {
        console.log(err);
      }
    };
    getCategoriesDetails();
  }, [categoryId]);

  return (
    <div className="text-white bg-gray-900 min-h-screen">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-sm text-gray-400">
          <span className="hover:text-blue-400 cursor-pointer">Home</span> /{" "}
          <span className="hover:text-blue-400 cursor-pointer">Catalog</span> /{" "}
          <span className="font-semibold text-blue-400">
            {catalogData?.data?.selectedCategory?.name || "Loading..."}
          </span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">
          {catalogData?.data?.selectedCategory?.name || "Loading..."}
        </h1>
        <p className="mt-2 text-gray-400 max-w-3xl">
          {catalogData?.data?.selectedCategory?.description || "Loading..."}
        </p>
      </div>

      {/* Section 1: Course to get you started */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Courses to Get You Started</h2>
          <div className="flex gap-x-4 text-gray-400">
            <p className="cursor-pointer hover:text-blue-400">Most Popular</p>
            <p className="cursor-pointer hover:text-blue-400">New</p>
          </div>
        </div>
        <CourseSlider courses={catalogData?.data?.selectedCategory?.courses} />
      </div>

      {/* Section 2: Top Courses */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">
          Top Courses in{" "}
          <span className="text-blue-400">
            {catalogData?.data?.selectedCategory?.name || "Loading..."}
          </span>
        </h2>
        <CourseSlider courses={catalogData?.data?.selectedCategory?.courses} />
      </div>

      {/* Section 3: Frequently Bought */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Frequently Bought</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {catalogData?.data?.selectedCategory?.courses?.slice(0, 4).map((course, index) => (
            <Course_Card course={course} key={index} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Catalog;
