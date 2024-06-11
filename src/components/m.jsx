import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [eye, setEye] = useState(false);
  const [form, setForm] = useState({
    url: "",
    username: "",
    password: "",
  });
  const [passwordArray, setPasswordArray] = useState([]);
  const [textDisplay, setTextDisplay] = useState(false);
  // const [showPasswordBlock, setShowPasswordBlock] = useState(false);

  const passwordBlock = useRef()

  useEffect(() => {
    let password = localStorage.getItem("password");
    if (password) {
      setPasswordArray(JSON.parse(password));
    }
  }, []);

  const HanddleEye = () => {
    setEye(!eye);
  };

  const HanddleSaveBtn = () => {
    if ((form.url && form.username && form.password).length >= 3) {
      const newPassword = { ...form, id: uuidv4() };
      const updatedPasswordArray = [...passwordArray, newPassword];
      setPasswordArray(updatedPasswordArray);
      localStorage.setItem("password", JSON.stringify(updatedPasswordArray));
      setForm({ url: "", username: "", password: "", id: "" });
    } else {
      setTextDisplay(true);
    }
  };

  const handdleInputChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handdleCopyBtn = (text) => {
    toast("Copied to clipboard.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const handdleDelete = (id) => {
    let cnfm = confirm("Delete?");
    if (cnfm) {
      toast("Deleted Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      const newPasswordArray = passwordArray.filter((item) => item.id !== id);
      setPasswordArray(newPasswordArray);
      localStorage.setItem("password", JSON.stringify(newPasswordArray));
    }
  };

  const handdleEdit = (id, { url, username, password }) => {
    const newPasswordArray = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(newPasswordArray);
    setForm({ url, username, password, id });

  return (
    <div className="relative h-full w-full bg-slate-950">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="text-white py-5 min-h-screen">
        <div className="relative main-container m-auto text-center max-w-5xl px-4">
          <div className="hero p-4">
            <div className="text-lg md:text-3xl m-2">
              <h1>
                MYPASS - <span className="my-5">Your Own Password Manager</span>
              </h1>
            </div>
            <div className="md:text-xl">
              <p>- Manage All Your Passwords in One Place</p>
            </div>
          </div>
          <div className="inputSection">
            <div className="py-6">
              <input
                onChange={handdleInputChange}
                name="url"
                value={form.url}
                placeholder="Enter URL/SITE"
                className="text-black p-1 m-2 w-full md:w-2/3 px-5 rounded-full"
                type="text"
              />
              <div className="w-fit">
                {textDisplay && form.url.length < 3 && (
                  <span className="text-red-500 text-sm md:pl-44">
                    URL/SITE length should be more than 3
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center">
              <div className="md:mx-3 md:w-[55%]">
                <input
                  required
                  onChange={handdleInputChange}
                  name="username"
                  value={form.username}
                  placeholder="Enter Username"
                  className="text-black p-1 m-2 px-5 rounded-full w-full"
                  type="text"
                />
                <div className="w-fit">
                  {textDisplay && form.username.length < 3 && (
                    <span className="text-red-500 text-sm md:pl-5">
                      Username length should be more than 3
                    </span>
                  )}
                </div>
              </div>

              <div className="relative w-full md:w-1/4">
                <input
                  required
                  onChange={handdleInputChange}
                  name="password"
                  value={form.password}
                  placeholder="Enter Password"
                  className="text-black p-1 m-2 px-5 rounded-full w-full"
                  type={!eye ? "password" : "text"}
                />
                <div className="w-fit">
                  {textDisplay && form.password.length < 3 && (
                    <span className="text-red-500 text-sm md:pl-5">
                      length should be more than 3
                    </span>
                  )}
                </div>
                <div>
                  <span
                    className="absolute inset-y-0 right-0 top-[13px] h-5 flex items-center pr-3 cursor-pointer bg-white"
                    onClick={HanddleEye}
                  >
                    {!eye ? (
                      <FaRegEye fill="black" />
                    ) : (
                      <FaRegEyeSlash fill="black" />
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center m-4">
              <button
                className="border w-fit rounded-full p-2 bg-slate-700 hover:bg-slate-800  ml-[38%]"
                onClick={HanddleSaveBtn}
              >
                <span>Save Password</span>
              </button>
            </div>
          </div>
          <div className="text-start m-3 text-xl">
            <span>
              {passwordArray.length >= 1
                ? "Your Passwords:"
                : "No Passwords to Display!"}
            </span>
          </div>
          <div className="pt-2 overflow-x-auto">
            <table className="table-auto w-full text-center">
              <thead className="bg-slate-900 text-lg">
                <tr>
                  <th className="p-3">URL/SITE</th>
                  <th className="p-3">Username</th>
                  <th className="p-3">Password</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item) => (
                  <tr key={item.id}>
                    <td className="py-5">
                      <div className="flex gap-3 justify-center items-center px-5">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.url}
                        </a>
                        <div>
                          <MdContentCopy
                            className="cursor-pointer"
                            onClick={() => handdleCopyBtn(item.url)}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex gap-3 justify-center items-center px-5">
                        {item.username}
                        <div>
                          <MdContentCopy
                            className="cursor-pointer"
                            onClick={() => handdleCopyBtn(item.username)}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex gap-3 justify-center items-center px-5">
                        <div
                          className="flex items-center justify-center gap-4 pt-[10px] w-[200px]"
                        >
                          <p ref={passwordBlock} className="p-3">
                            {"*".repeat(item.password.length)}
                          </p>
                        </div>

                        <div>
                          <MdContentCopy
                            className="cursor-pointer"
                            onClick={() => handdleCopyBtn(item.password)}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex gap-3 justify-center items-center">
                        <LuClipboardEdit
                          size={23}
                          className="cursor-pointer"
                          onClick={() => handdleEdit(item.id, item)}
                        />
                        <MdOutlineDelete
                          size={29}
                          className="cursor-pointer"
                          onClick={() => handdleDelete(item.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
};

export default Manager;
