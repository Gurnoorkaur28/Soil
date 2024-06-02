// Some code / concept taken from - https://www.youtube.com/watch?v=ZpfseYy5Hxg

import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Repo
import { fetchProducts, fetchReviews } from "../data/repository";

// Register the chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Metrics() {
  // Review and products
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);

  // Initial chart data
  const initialChartData = {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderColor: "rgba(0, 0, 0, 0)",
      },
    ],
  };

  const [averageRatingData, setAverageRatingData] = useState(initialChartData);
  const [engagementData, setEngagementData] = useState(initialChartData);

  // Fetch data
  useEffect(() => {
    async function loadData() {
      const reviewsData = await fetchReviews();
      const productsData = await fetchProducts();

      setReviews(reviewsData);
      setProducts(productsData);
    }

    loadData();
  }, []);

  useEffect(() => {
    if (reviews && products) {
      setAverageRatingData(calcAvgRating(reviews, products));
      setEngagementData(calcEngagement(reviews, products));
    }
  }, [reviews, products]);

  return (
    <div>
      <h1 className="text-start display-4">Metrics</h1>
      <div>
        <h2>Average Product Rating Over Time</h2>
        <Line data={averageRatingData} options={{ responsive: true }} />
      </div>
      <br></br>
      <div>
        <h2>User Engagement with Products</h2>
        <Bar data={engagementData} options={{ responsive: true }} />
      </div>
    </div>
  );
}

// Calculate average raring
function calcAvgRating(reviews, products) {
  const ratings = {};

  // Initialize counters for each product
  products.forEach((product) => {
    ratings[product.id] = { sum: 0, count: 0, name: product.name };
  });

  // Aggregate ratings by product
  reviews.forEach((review) => {
    if (ratings[review.productId]) {
      ratings[review.productId].sum += review.rating;
      ratings[review.productId].count++;
    }
  });

  return {
    labels: Object.keys(ratings).map((id) => ratings[id].name),
    datasets: [
      {
        label: "Average Rating",
        data: Object.values(ratings).map((r) =>
          r.count > 0 ? (r.sum / r.count).toFixed(1) : 0
        ),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };
}

// Calculate product engagement
function calcEngagement(reviews, products) {
  const engagement = products.map((product) => ({
    name: product.name,
    count: reviews.filter((review) => review.productId === product.id).length,
  }));

  return {
    labels: engagement.map((data) => data.name),
    datasets: [
      {
        label: "Number of Reviews",
        data: engagement.map((data) => data.count),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
}

export default Metrics;
