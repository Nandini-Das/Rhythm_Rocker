import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:5000/classes');
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error('Error fetching classes', error);
      }
    };

    fetchClasses();
  }, []);

  const openModal = (id) => {
    setSelectedClassId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedClassId('');
    setFeedbackText('');
  };
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const feedback = feedbackText;
    console.log(feedback)
  
    fetch(`http://localhost:5000/classes/${selectedClassId}`, {
      method: 'PATCH',
      body: JSON.stringify({ feedback }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setClasses((prevClasses) =>
            prevClasses.map((classItem) =>
              classItem._id === selectedClassId ? { ...classItem, feedback } : classItem
            )
          );
  
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Feedback has been sent',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error('Error submitting feedback', error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error submitting feedback',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  
    closeModal();
  };
  

  const handleApprove = (id) => {
    const status = 'approved';

    fetch(`http://localhost:5000/classes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setClasses((prevClasses) =>
            prevClasses.map((classItem) =>
              classItem._id === id ? { ...classItem, status: 'approved' } : classItem
            )
          );

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Class is approved',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleDeny = (id) => {
    const status = 'denied';

    fetch(`http://localhost:5000/classes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setClasses((prevClasses) =>
            prevClasses.map((classItem) =>
              classItem._id === id ? { ...classItem, status: 'denied' } : classItem
            )
          );

          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Class has been denied',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Classes</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Course Image</th>
            <th>Course Name</th>
            <th>Instructor Name</th>
            <th>Instructor Email</th>
            <th>Available Seats</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <tr key={classItem._id}>
              <td>
                <img src={classItem.class_image} alt="Course Image" className="w-16 h-16" />
              </td>
              <td>{classItem.course_name}</td>
              <td>{classItem.instructor_name}</td>
              <td>{classItem.email}</td>
              <td>{classItem.available_seats}</td>
              <td>${classItem.price}</td>
              <td>{classItem.status}</td>
              <td>
                {classItem.status === 'pending' && (
                  <>
                    <button
                      className="btn btn-success mb-2 w-full"
                      disabled={classItem.status !== 'pending'}
                      onClick={() => handleApprove(classItem._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-error mb-2 w-full"
                      disabled={classItem.status !== 'pending'}
                      onClick={() => handleDeny(classItem._id)}
                    >
                      Deny
                    </button>
                  </>
                )}
                <button
                  className="btn btn-info w-full"
                  disabled={classItem.status === 'approved'}
                  onClick={() => openModal(classItem._id)}
                >
                  Send Feedback
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={modalOpen} onClose={closeModal} center>
        <h2>Send Feedback</h2>
        <form onSubmit={handleFeedbackSubmit}>
          <div>
            <label htmlFor="feedbackText"></label>
            <textarea
              id="feedbackText"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageClasses;
