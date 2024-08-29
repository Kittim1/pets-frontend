'use client';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';
import './globals.css'; 

export default function Dashboard() {
  const [pets, setPets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [owners, setOwners] = useState([]);
  const [showPetModal, setShowPetModal] = useState(false);
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [showSpeciesModal, setShowSpeciesModal] = useState(false);
  const [showBreedModal, setShowBreedModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [filterType, setFilterType] = useState('pets'); // New state to track the filter selection
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
  const [speciesFormData, setSpeciesFormData] = useState({
    speciesName: '',
  });
  const [breedFormData, setBreedFormData] = useState({
    breedName: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchFilteredData(); // Fetch data based on the selected filter type
  }, [filterType]);

  const fetchFilteredData = () => {
    if (filterType === 'pets') {
      fetchPets();
    } else if (filterType === 'species') {
      fetchSpecies();
    } else if (filterType === 'breeds') {
      fetchBreeds();
    } else if (filterType === 'owners') {
      fetchOwners();
    }
  };

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
      setSpecies(data);
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
          setSuccessMessage(`${modalType === 'add' ? 'Yehey! Added' : 'Yehey! Edited'} pet successfully!`);
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

  const handleAddSpecies = (e) => {
    e.preventDefault();

    fetch('http://localhost/api/assignment3/pets.php?action=addSpecies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(speciesFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fetchSpecies();
          setSuccessMessage('Species added successfully!');
          setShowAlert(true);
          setShowSpeciesModal(false);
          setSpeciesFormData({
            speciesName: '',
          });
        } else {
          alert('Failed to add species');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleAddBreed = (e) => {
    e.preventDefault();

    fetch('http://localhost/api/assignment3/pets.php?action=addBreed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(breedFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fetchBreeds();
          setSuccessMessage('Breed added successfully!');
          setShowAlert(true);
          setShowBreedModal(false);
          setBreedFormData({
            breedName: '',
          });
        } else {
          alert('Failed to add breed');
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

  const openSpeciesModal = () => {
    setShowSpeciesModal(true);
  };

  const openBreedModal = () => {
    setShowBreedModal(true);
  };

  return (
    <>
      <Container className="mt-5" style={{ background: 'linear-gradient(to bottom, #001f3f, #001845)', padding: '5px', minHeight: '100vh' }}>
        <div>
          <h1 className="text-center" style={{ color: 'white' }}>Moy's PetShop Daw</h1>
          <div className='button-container'>
            <Button variant="primary" onClick={() => openPetModal('add')}>Add Pet</Button>
            <Button variant="secondary" onClick={openOwnerModal}>Add Owner</Button>
            <Button variant="info" onClick={openSpeciesModal}>Add Species</Button>
            <Button variant="success" onClick={openBreedModal}>Add Breed</Button>
          </div>
          {/* Filter Dropdown */}
          <Form.Group controlId="filterType">
            <Form.Label>Filter By</Form.Label>
            <Form.Control
              as="select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="pets">Pets</option>
              <option value="species">Species</option>
              <option value="breeds">Breeds</option>
              <option value="owners">Owners</option>
            </Form.Control>
          </Form.Group>

          <h1 className="text-center" style={{ color: 'white' }}>Akong Pet Info</h1>

          {/* Conditionally Render Tables Based on Filter */}
          {filterType === 'pets' && (
            <table className="table">
              <thead>
                <tr>
                  <th>Owner's Name</th>
                  <th>Pet Name</th>
                  <th>Species Name</th>
                  <th>Breed Name</th>
                  <th>Date of Birth</th>
                  <th>Action</th>
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
                      <Button variant="secondary" onClick={() => openPetModal('edit', pet)}>Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {filterType === 'species' && (
            <table className="table">
              <thead>
                <tr>
                  <th>Species ID</th>
                  <th>Species Name</th>
                </tr>
              </thead>
              <tbody>
                {species.map((s) => (
                  <tr key={s.SpeciesID}>
                    <td>{s.SpeciesID}</td>
                    <td>{s.SpeciesName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {filterType === 'breeds' && (
            <table className="table">
              <thead>
                <tr>
                  <th>Breed ID</th>
                  <th>Breed Name</th>
                </tr>
              </thead>
              <tbody>
                {breeds.map((b) => (
                  <tr key={b.BreedID}>
                    <td>{b.BreedID}</td>
                    <td>{b.BreedName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {filterType === 'owners' && (
            <table className="table">
              <thead>
                <tr>
                  <th>Owner ID</th>
                  <th>Owner Name</th>
                  <th>Owner Contact Details</th>
                  <th>Owner Address</th>
                </tr>
              </thead>
              <tbody>
                {owners.map((o) => (
                  <tr key={o.OwnerID}>
                    <td>{o.OwnerID}</td>
                    <td>{o.OwnerName}</td>
                    <td>{o.OwnerContactDetails}</td>
                    <td>{o.OwnerAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Container>

      <Modal show={showPetModal} onHide={() => setShowPetModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'add' ? 'Add Pet' : 'Edit Pet'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddOrEditPet}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pet's name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="speciesID">
              <Form.Label>Species</Form.Label>
              <Form.Control
                as="select"
                value={formData.speciesID}
                onChange={(e) => setFormData({ ...formData, speciesID: e.target.value })}
              >
                <option value="">Select species</option>
                {species.map((s) => (
                  <option key={s.SpeciesID} value={s.SpeciesID}>
                    {s.SpeciesName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="breedID">
              <Form.Label>Breed</Form.Label>
              <Form.Control
                as="select"
                value={formData.breedID}
                onChange={(e) => setFormData({ ...formData, breedID: e.target.value })}
              >
                <option value="">Select breed</option>
                {breeds.map((b) => (
                  <option key={b.BreedID} value={b.BreedID}>
                    {b.BreedName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="dateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter date of birth"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="ownerID">
              <Form.Label>Owner</Form.Label>
              <Form.Control
                as="select"
                value={formData.ownerID}
                onChange={(e) => setFormData({ ...formData, ownerID: e.target.value })}
              >
                <option value="">Select owner</option>
                {owners.map((o) => (
                  <option key={o.OwnerID} value={o.OwnerID}>
                    {o.OwnerName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              {modalType === 'add' ? 'Add Pet' : 'Save Changes'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showOwnerModal} onHide={() => setShowOwnerModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Owner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddOwner}>
            <Form.Group controlId="ownerName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter owner's name"
                value={ownerFormData.ownerName}
                onChange={(e) => setOwnerFormData({ ...ownerFormData, ownerName: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="ownerContactDetails">
              <Form.Label>Contact Details</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter owner's contact details"
                value={ownerFormData.ownerContactDetails}
                onChange={(e) => setOwnerFormData({ ...ownerFormData, ownerContactDetails: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="ownerAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter owner's address"
                value={ownerFormData.ownerAddress}
                onChange={(e) => setOwnerFormData({ ...ownerFormData, ownerAddress: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Owner
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showSpeciesModal} onHide={() => setShowSpeciesModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Species</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSpecies}>
            <Form.Group controlId="speciesName">
              <Form.Label>Species Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter species name"
                value={speciesFormData.speciesName}
                onChange={(e) => setSpeciesFormData({ ...speciesFormData, speciesName: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Species
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showBreedModal} onHide={() => setShowBreedModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Breed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddBreed}>
            <Form.Group controlId="breedName">
              <Form.Label>Breed Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter breed name"
                value={breedFormData.breedName}
                onChange={(e) => setBreedFormData({ ...breedFormData, breedName: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Breed
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          {successMessage}
        </Alert>
      )}
    </>
  );
}
