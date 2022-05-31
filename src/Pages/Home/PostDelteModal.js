import React from "react";
import Swal from "sweetalert2";
import axiosPrivate from "../Api/axiosPrivate";

const PostDelteModal = ({deleteUser,setDelete,refetch}) => {

    const handleDelete = () => {
        axiosPrivate.delete(`blogs/${deleteUser?._id}`)
        .then(response => {
            Swal.fire({
                position: 'top center',
                icon: 'success',
                title: 'delete success',
                showConfirmButton: false,
                timer: 1500
              })
            refetch()
        })
    }
  return (
    <div>
      <input type="checkbox" id="delete-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg">
            Are you sure?
          </h3>
          <div class="modal-action">
            <label onClick={handleDelete} for="delete-modal" class="btn btn-error bg-red-600 text-white">
              Delete
            </label>
            <label for="delete-modal" class="btn">
              Not Now
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDelteModal;
