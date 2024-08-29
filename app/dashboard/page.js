// 'use client';
// import { useEffect, useState } from 'react';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Alert from 'react-bootstrap/Alert';
// import { Container } from 'react-bootstrap';

// export default function Dashboard() {
//   const [pets, setPets] = useState([]);
//   const [species, setSpecies] = useState([]);
//   const [breeds, setBreeds] = useState([]);
//   const [owners, setOwners] = useState([]);
//   const [showPetModal, setShowPetModal] = useState(false);
//   const [showOwnerModal, setShowOwnerModal] = useState(false);
//   const [showSpeciesModal, setShowSpeciesModal] = useState(false);
//   const [showBreedModal, setShowBreedModal] = useState(false);
//   const [modalType, setModalType] = useState('');
//   const [formData, setFormData] = useState({
//     name: '',
//     speciesID: '',
//     breedID: '',
//     dateOfBirth: '',
//     ownerID: '',
//   });
//   const [ownerFormData, setOwnerFormData] = useState({
//     ownerName: '',
//     ownerContactDetails: '',
//     ownerAddress: '',
//   });
//   const [speciesFormData, setSpeciesFormData] = useState({
//     speciesName: '',
//   });
//   const [breedFormData, setBreedFormData] = useState({
//     breedName: '',
//     speciesID: '',
//   });
//   const [successMessage, setSuccessMessage] = useState('');
//   const [showAlert, setShowAlert] = useState(false);

//   useEffect(() => {
//     fetchPets();
//     fetchSpecies();
//     fetchBreeds();
//     fetchOwners();
//   }, []);

//   // Existing fetch functions...

//   const handleAddSpecies = (e) => {
//     e.preventDefault();

//     fetch('http://localhost/api/assignment3/pets.php?action=addSpecies', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: new URLSearchParams(speciesFormData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           fetchSpecies();
//           setSuccessMessage('Species added successfully!');
//           setShowAlert(true);
//           setShowSpeciesModal(false);
//           setSpeciesFormData({
//             speciesName: '',
//           });
//         } else {
//           alert('Failed to add species');
//         }
//       })
//       .catch((error) => console.error('Error:', error));
//   };

//   const handleAddBreed = (e) => {
//     e.preventDefault();

//     fetch('http://localhost/api/assignment3/pets.php?action=addBreed', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: new URLSearchParams(breedFormData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           fetchBreeds();
//           setSuccessMessage('Breed added successfully!');
//           setShowAlert(true);
//           setShowBreedModal(false);
//           setBreedFormData({
//             breedName: '',
//             speciesID: '',
//           });
//         } else {
//           alert('Failed to add breed');
//         }
//       })
//       .catch((error) => console.error('Error:', error));
//   };

//   const openPetModal = (type, pet = null) => {
//     setModalType(type);
//     setShowPetModal(true);
//     // Existing code for opening pet modal...
//   };

//   const openOwnerModal = () => {
//     setShowOwnerModal(true);
//   };

//   const openSpeciesModal = () => {
//     setShowSpeciesModal(true);
//   };

//   const openBreedModal = () => {
//     setShowBreedModal(true);
//   };

//   return (
//     <>
//       <Container>
//         <div>
//           <h1>Dashboard Sakong Maderpakening Pet's Info</h1>
//           <Button variant="primary" onClick={() => openPetModal('add')}>Add Pet</Button>
//           <p>Or</p>
//           <Button variant="secondary" onClick={openOwnerModal}>Add Owner</Button>
//           <p>Or</p>
//           <Button variant="info" onClick={openSpeciesModal}>Add Species</Button>
//           <p>Or</p>
//           <Button variant="info" onClick={openBreedModal}>Add Breed</Button>
//           <h1>Akong Pet Info</h1>
//           <table className="table">
//             <thead>
//               {/* Table headers */}
//             </thead>
//             <tbody>
//               {/* Table rows */}
//             </tbody>
//           </table>

//           {/* Pet Modal */}
//           {/* Existing code for Pet Modal... */}

//           {/* Owner Modal */}
//           {/* Existing code for Owner Modal... */}

//           {/* Species Modal */}
//           <Modal show={showSpeciesModal} onHide={() => setShowSpeciesModal(false)}>
//             <Modal.Header closeButton>
//               <Modal.Title>Add Species</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               {showAlert && <Alert variant="success">{successMessage}</Alert>}
//               <Form onSubmit={handleAddSpecies}>
//                 <Form.Group controlId="formSpeciesName">
//                   <Form.Label>Species Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="speciesName"
//                     placeholder="Species Name"
//                     value={speciesFormData.speciesName}
//                     onChange={(e) => setSpeciesFormData({ ...speciesFormData, speciesName: e.target.value })}
//                   />
//                 </Form.Group>
//                 <Button variant="primary" type="submit">
//                   Add Species
//                 </Button>
//               </Form>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={() => setShowSpeciesModal(false)}>
//                 Close
//               </Button>
//             </Modal.Footer>
//           </Modal>

//           {/* Breed Modal */}
//           <Modal show={showBreedModal} onHide={() => setShowBreedModal(false)}>
//             <Modal.Header closeButton>
//               <Modal.Title>Add Breed</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               {showAlert && <Alert variant="success">{successMessage}</Alert>}
//               <Form onSubmit={handleAddBreed}>
//                 <Form.Group controlId="formBreedName">
//                   <Form.Label>Breed Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="breedName"
//                     placeholder="Breed Name"
//                     value={breedFormData.breedName}
//                     onChange={(e) => setBreedFormData({ ...breedFormData, breedName: e.target.value })}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formSpecies">
//                   <Form.Label>Species</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="speciesID"
//                     value={breedFormData.speciesID}
//                     onChange={(e) => setBreedFormData({ ...breedFormData, speciesID: e.target.value })}
//                   >
//                     <option value="">Select Species</option>
//                     {species.map((sp) => (
//                       <option key={sp.SpeciesID} value={sp.SpeciesID}>
//                         {sp.SpeciesName}
//                       </option>
//                     ))}
//                   </Form.Control>
//                 </Form.Group>
//                 <Button variant="primary" type="submit">
//                   Add Breed
//                 </Button>
//               </Form>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={() => setShowBreedModal(false)}>
//                 Close
//               </Button>
//             </Modal.Footer>
//           </Modal>

//         </div>
//       </Container>
//     </>
//   );
// }
