import React, { useEffect, useState } from "react";
import "./CreateService.css";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getSubCatergoy, postCreateService } from "../../../../../api/testApi";
import Swal from "sweetalert2";

export default function CreateService({onCreate}) {
  const [name, setName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imgName, setImgName] = useState("No selected image.");
  const [remainingCharacters, setRemainingCharacters] = useState(60);
  const [categories, setCategories] = useState([]);
  const userId = localStorage.getItem("userId") || "";

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleName = (value) => {
    if (value.length <= 60) {
      const updatedName = value.slice(0, 60);
      setName(updatedName);
      setRemainingCharacters(60 - updatedName.length);
    }
  };

  const handlesubCategory = (event) => {
    const selectedOption = event.target.value;
    setSubCategory(selectedOption);
  };

  const handleType = (event) => {
    const selectedOption = event.target.value;
    setType(selectedOption);
  };

  const handleDescription = (value) => {
    setDescription(value);
  };

  const handlePrice = (value) => {
    setPrice(value);
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
    file && setImgName(file.name);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setImageFile(file);
      setImgName(file.name);
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSave = async () => {
    if (!name || !subCategory || !description || !price || !type) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append("UserId", userId);
    formData.append("Title", name);
    formData.append("SubCategoryId", subCategory);
    formData.append("Type", type);
    formData.append("Description", description);
    formData.append("Price", price);
    formData.append("ThumbNail", imageFile);

    try {
      // Gửi yêu cầu POST đến API
      const response = await postCreateService(formData, token);

      setName("");
      setSubCategory("");
      setDescription("");
      setPrice("");
      setType("");
      setImageFile("");
      setIsLoading(false);

      console.log("url", response.data);
      Swal.fire({
        icon: "success",
        title: "Successfully!",
        text: "Create service successfully!",
      });
      navigate("/shopProfile/shop");
      setIsPopupOpen(false);
      onCreate(response.data);
    } catch (error) {
      // Xử lý lỗi
      alert("Hãy kiểm tra lại thông tin nhập vào!");
      console.error("Đã có lỗi xảy ra khi gửi yêu cầu API:", error);
      console.log(formData);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const isUserLoggedIn = token !== null;
    setIsLogin(isUserLoggedIn);

    // Redirect to login if not logged in
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const categoriesData = async () => {
      try {
        const response = await getSubCatergoy();
        console.log(response.data);
        setCategories(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    categoriesData();
  }, []);

  return (
    <div className="createart">
      {isLogin && (
        <a href="#popupCreate" onClick={() => setIsPopupOpen(true)}>
          <div className="createArt">
            <div className="cartcreate">
              <div>
                <i className="material-icons">add</i>
              </div>
              <span>Add your service here</span>
              <p>Providing pet care services to everyone.</p>
            </div>
          </div>
        </a>
      )}

      {/* popup */}
      {isPopupOpen && (
        <div id="popupCreate" className="overlay">
          <div className="popup">
            <div className="iconclose">
              <span style={{ marginLeft: "10px" }}>Add your new service</span>
              <a
                className="close"
                href="#"
                style={{ color: "black", textDecoration: "none" }}
              >
                &times;
              </a>
            </div>

            <div className="popupCreate">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  border: "none",
                }}
              >
                <section
                  style={{
                    width: "300px",
                  }}
                  onDrop={(e) => handleDrop(e)}
                  onDragOver={(e) => handleDragOver(e)}
                >
                  <div
                    className="popupImage"
                    onClick={(e) =>
                      document.querySelector(".input-img").click()
                    }
                  >
                    <input
                      type="file"
                      onChange={(e) => handleImageFile(e)}
                      accept="image/*"
                      hidden
                      className="input-img"
                    />
                    {imageFile ? (
                      <img
                        src={imageUrl}
                        alt=""
                        style={{
                          width: "310px",
                          height: "250px",
                          objectFit: "cover",
                          objectPosition: "50% 50%",
                        }}
                      />
                    ) : (
                      <div
                        className="imgNew"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <i
                          className="material-icons"
                          style={{ color: "#1475cf", fontSize: "40px" }}
                        >
                          backup
                        </i>
                        <span>Drop or click here to upload your image</span>
                      </div>
                    )}
                  </div>
                </section>

                <section
                  style={{
                    width: "350px",
                    height: "265px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <div className="popupInput">
                    <input
                      type="text"
                      placeholder="Enter name of service *"
                      onChange={(e) => handleName(e.target.value)}
                      maxLength={60}
                    />
                    <span style={{ fontWeight: "600", color: "#838592" }}>
                      {remainingCharacters}
                    </span>
                  </div>

                  <FormControl
                    sx={{ m: 1, minWidth: 120 }}
                    style={{ margin: "0 0 5px 0", width: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-helper-label">
                      Category *
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={subCategory}
                      onChange={handlesubCategory}
                      label="Category *"
                      style={{ borderRadius: "10px" }}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 250, // Đặt giới hạn chiều cao tại đây
                          },
                        },
                      }}
                    >
                      <MenuItem value={""}></MenuItem>
                      {Array.isArray(categories) &&
                        categories
                          .filter((category) => category.status === 1)
                          .map((category) => (
                            <MenuItem value={`${category.subId}`}>
                              {category.subName}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    sx={{ m: 1, minWidth: 120 }}
                    style={{ margin: "0 0 5px 0", width: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-helper-label">
                      Type *
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={type}
                      onChange={handleType}
                      label="Type *"
                      style={{ borderRadius: "10px" }}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 250, // Đặt giới hạn chiều cao tại đây
                          },
                        },
                      }}
                    >
                      <MenuItem value={""}></MenuItem>
                      <MenuItem value={"Dog"}>Dog</MenuItem>
                      <MenuItem value={"Cat"}>Cat</MenuItem>
                    </Select>
                  </FormControl>
                  <div className="popupInput">
                    <input
                      type="number"
                      placeholder="Enter price of services (VNĐ)"
                      onChange={(e) => handlePrice(e.target.value)}
                      min="0"
                    />
                    <span style={{ fontWeight: "600", color: "#838592" }}>
                      VNĐ
                    </span>
                  </div>
                </section>
              </div>

              <div
                className="popupTextArea"
                style={{ border: "none", flexDirection: "column" }}
              >
                <section
                  style={{
                    width: "95%",
                    border: "0.5px solid #c9cacf",
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                >
                  <textarea
                    type="text"
                    placeholder="Enter description of artwork *"
                    onChange={(e) => handleDescription(e.target.value)}
                    style={{
                      border: "none",
                      height: "150px",
                      width: "100%",
                      marginTop: "10px",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </section>
                <section
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <i className="material-icons">attach_file</i>
                  <span>{imgName}</span>
                  <i
                    className="material-icons"
                    onClick={() => {
                      setImgName("No selected image.");
                      setImageUrl(null);
                      setImageFile(null);
                    }}
                    style={{ color: "#1475cf" }}
                  >
                    delete
                  </i>
                </section>
              </div>

              <div className="popupButtonCreate">
                <button onClick={() => handleSave()} disabled={isLoading}>
                  <span>{isLoading ? "Creating..." : "Create"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
