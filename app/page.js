'use client';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';

export default function Dashboard() {
  const [pets, setPets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [owners, setOwners] = useState([]);
  const [showPetModal, setShowPetModal] = useState(false);
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    speciesID: '',
    breedID: '',
    dateOfBirth: '',
    ownerID: '',
  });
  const [ownerFormData, setOwnerFormData] = useState({
    ownerName: '',
    ownerContactDetails: '',
    ownerAddress: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchPets();
    fetchSpecies();
    fetchBreeds();
    fetchOwners();
  }, []);

  const fetchPets = () => {
    fetch('http://localhost/api/assignment3/pets.php?action=getPets')
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error('Error:', error));
  };

  const fetchSpecies = async () => {
    try {
      const response = await fetch('http://localhost/api/assignment3/pets.php?action=getSpecies');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSpecies(data); // Update state with species data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchBreeds = () => {
    fetch('http://localhost/api/assignment3/pets.php?action=getBreeds')
      .then((response) => response.json())
      .then((data) => setBreeds(data))
      .catch((error) => console.error('Error:', error));
  };

  const fetchOwners = () => {
    fetch('http://localhost/api/assignment3/pets.php?action=getOwners')
      .then((response) => response.json())
      .then((data) => setOwners(data))
      .catch((error) => console.error('Error:', error));
  };

  const handleAddOrEditPet = (e) => {
    e.preventDefault();
    const action = modalType === 'add' ? 'addPet' : 'editPet';

    fetch(`http://localhost/api/assignment3/pets.php?action=${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fetchPets();
          setSuccessMessage(`${modalType === 'add' ? 'Added' : 'Edited'} pet successfully!`);
          setShowAlert(true);
          setShowPetModal(false);
          setFormData({
            name: '',
            speciesID: '',
            breedID: '',
            dateOfBirth: '',
            ownerID: '',
          });
        } else {
          alert(`Failed to ${modalType === 'add' ? 'add' : 'edit'} pet`);
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleAddOwner = (e) => {
    e.preventDefault();

    fetch('http://localhost/api/assignment3/pets.php?action=addOwner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(ownerFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fetchOwners();
          setSuccessMessage('Owner added successfully!');
          setShowAlert(true);
          setShowOwnerModal(false);
          setOwnerFormData({
            ownerName: '',
            ownerContactDetails: '',
            ownerAddress: '',
          });
        } else {
          alert('Failed to add owner');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  const openPetModal = (type, pet = null) => {
    setModalType(type);
    setShowPetModal(true);
    if (pet) {
      setFormData({
        petID: pet.PetID,
        name: pet.PetName,
        speciesID: pet.SpeciesID,
        breedID: pet.BreedID,
        dateOfBirth: pet.DateOfBirth,
        ownerID: pet.OwnerID,
      });
    } else {
      setFormData({
        name: '',
        speciesID: '',
        breedID: '',
        dateOfBirth: '',
        ownerID: '',
      });
    }
  };

  const openOwnerModal = () => {
    setShowOwnerModal(true);
  };

  return (
   <>
   <Container>
   <div>
      <h1>Dashboard Sakong Maderpakening Pet's Info</h1>
      <Button variant="primary" onClick={() => openPetModal('add')}>Add Pet</Button>
      <p>Or</p>
      <Button variant="secondary" onClick={openOwnerModal}>Add Owner</Button>
      <h1>Akong Pet Info</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Owner's Name</th>
            <th>Pet Name</th>
            <th>Species</th>
            <th>Breed</th>
            <th>Date Of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.PetID}>
              <td>{pet.OwnerName}</td>
              <td>{pet.PetName}</td>
              <td>{pet.SpeciesName}</td>
              <td>{pet.BreedName}</td>
              <td>{pet.DateOfBirth}</td>
              <td>
                <Button variant="warning" onClick={() => openPetModal('edit', pet)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showPetModal} onHide={() => setShowPetModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'add' ? 'Add Pet' : 'Edit Pet'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAlert && <Alert variant="success">{successMessage}</Alert>}
          <Form onSubmit={handleAddOrEditPet}>
            <Form.Group controlId="formPetName">
              <Form.Label>Pet Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Pet Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formSpecies">
              <Form.Label>Species</Form.Label>
              <Form.Control
                as="select"
                name="speciesID"
                value={formData.speciesID}
                onChange={(e) => setFormData({ ...formData, speciesID: e.target.value })}
              >
                <option value="">Select Species</option>
                {species.map((sp) => (
                  <option key={sp.SpeciesID} value={sp.SpeciesID}>
                    {sp.SpeciesName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBreed">
              <Form.Label>Breed</Form.Label>
              <Form.Control
                as="select"
                name="breedID"
                value={formData.breedID}
                onChange={(e) => setFormData({ ...formData, breedID: e.target.value })}
              >
                <option value="">Select Breed</option>
                {breeds.map((br) => (
                  <option key={br.BreedID} value={br.BreedID}>
                    {br.BreedName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formOwner">
              <Form.Label>Owner</Form.Label>
              <Form.Control
                as="select"
                name="ownerID"
                value={formData.ownerID}
                onChange={(e) => setFormData({ ...formData, ownerID: e.target.value })}
              >
                <option value="">Select Owner</option>
                {owners.map((owner) => (
                  <option key={owner.OwnerID} value={owner.OwnerID}>
                    {owner.Name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              {modalType === 'add' ? 'Add Pet' : 'Edit Pet'}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPetModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showOwnerModal} onHide={() => setShowOwnerModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Owner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAlert && <Alert variant="success">{successMessage}</Alert>}
          <Form onSubmit={handleAddOwner}>
            <Form.Group controlId="formOwnerName">
              <Form.Label>Owner Name</Form.Label>
              <Form.Control
                type="text"
                name="ownerName"
                placeholder="Owner Name"
                value={ownerFormData.ownerName}
                onChange={(e) => setOwnerFormData({ ...ownerFormData, ownerName: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formOwnerContactDetails">
              <Form.Label>Contact Details</Form.Label>
              <Form.Control
                type="text"
                name="ownerContactDetails"
                placeholder="Contact Details"
                value={ownerFormData.ownerContactDetails}
                onChange={(e) => setOwnerFormData({ ...ownerFormData, ownerContactDetails: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formOwnerAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="ownerAddress"
                placeholder="Address"
                value={ownerFormData.ownerAddress}
                onChange={(e) => setOwnerFormData({ ...ownerFormData, ownerAddress: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Owner
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOwnerModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
   </Container>
   </>
  );
}
