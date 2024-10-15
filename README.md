# Đây là Front-end của project SWD!!!!

Anh em hãy đặt tên từng folder trong component theo mô hình như sau:

├ src │```
├─ components │ ```
├── folder(theo từng chức năng) │ ```
├─── index.js │ ```
└─── index.css │

- Đối với 2 file `.js` và `.css` anh em hãy đặt theo tên của chức năng đó. Ví dụ: code login thì đặt tên `login.js` và `login.css`.
- Đối với tên folder thì ae hãy đặt chữ đầu là chữ viết thường và đặt thêm phương thức "con lạc đà" nha. Ví dụ đặt folder home page thì đặt "homePage" cho tên folder.
- Lưu ý: 
 + khi đặt tên class ae không được đặt trùng tên class nha, ví dụ nếu đặt className={container} ở nhiều component khác nhau thì nên thêm đằng sau container ví dụ đang code home page thì thêm className={container-homePage} để không bị nhưng component khác ảnh hưởng đến css
 + Còn nếu muốn css cho thẻ ví dụ <button> thì cần cần phải để tên class cha bên ngoài thẻ đó, ví dụ <div className={content-authPage}><button></button></div>
 thì sẽ đặt bên file css là ".content-authPage button"