import axios from "axios";
import React, { useEffect, useState } from "react";
import { ACCESS_KEY } from "./config/constants";

const App = () => {
  const [imageList, setImageList] = useState([]);
  const [tempImageList, settempImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&per_page=50`
      )
      .then((response) => {
        setImageList(response.data);
        settempImageList(response.data);
        setIsLoading(false);
      });
  }, []);

  const searchImage = (query) => {
    if (query === "") {
      setImageList(tempImageList);
    } else {
      const filteredImageList = imageList.filter((image) => {
        image.alt_description =
          image.alt_description === null ? "react" : image.alt_description;

        return image.alt_description.includes(query);
      });

      setImageList(filteredImageList);
    }
  };

  return (
    <div>
      <center>
        <input
          type="text"
          placeholder="Search Images..."
          style={{
            height: "25px",
            width: "40%",
            borderRadius: "20px",
            padding: "10px",
            fontSize: "17px",
          }}
          onChange={(e) => searchImage(e.target.value)}
        />
      </center>

      {/* {isLoading ? "Loading..." : null} */}

      {/* image container */}
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {imageList.length > 0 ? (
          imageList.map((image) => {
            return (
              <div
                key={image.id}
                style={{ padding: "20px", textAlign: "center" }}
              >
                <img
                  src={image.urls.regular}
                  style={{
                    width: "300px",
                    height: "250px",
                    objectFit: "cover",
                  }}
                  alt={image.alt_description}
                />
                <br />
                {image.alt_description
                  ? image.alt_description.substring(0, 30)
                  : "react"}
              </div>
            );
          })
        ) : (
          <h2 style={{ margin: "15% 0" }}>
            {isLoading ? "Loading..." : "No image Found!"}
          </h2>
        )}
      </div>
    </div>
  );
};

export default App;
