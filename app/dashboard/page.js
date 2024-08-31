'use client'
import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Modal, Alert, Table } from 'react-bootstrap';
import axios from 'axios';

export default function Dashboard() {
  const [filterType, setFilterType] = useState('pets');
  const [pets, setPets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [owners, setOwners] = useState([]);
  const [showPetModal, setShowPetModal] = useState(false);
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [showSpeciesModal, setShowSpeciesModal] = useState(false);
  const [showBreedModal, setShowBreedModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    speciesID: '',
    breedID: '',
    dateOfBirth: '',
    ownerID: ''
  });
  const [ownerFormData, setOwnerFormData] = useState({
    ownerName: '',
    ownerContactDetails: '',
    ownerAddress: ''
  });
  const [speciesFormData, setSpeciesFormData] = useState({
    speciesName: ''
  });
  const [breedFormData, setBreedFormData] = useState({
    breedName: '',
    speciesID: ''
  });

  useEffect(() => {
    // Fetch data from APIs
    axios.get('/api/pets').then((response) => setPets(response.data));
    axios.get('/api/species').then((response) => setSpecies(response.data));
    axios.get('/api/breeds').then((response) => setBreeds(response.data));
    axios.get('/api/owners').then((response) => setOwners(response.data));
  }, []);

  const handleAddOrEditPet = (e) => {
    e.preventDefault();
    // Handle add/edit pet logic
    setShowPetModal(false);
    setShowAlert(true);
    setSuccessMessage('Pet added/updated successfully!');
  };

  const handleAddOwner = (e) => {
    e.preventDefault();
    // Handle add owner logic
    setShowOwnerModal(false);
    setShowAlert(true);
    setSuccessMessage('Owner added successfully!');
  };

  const handleAddSpecies = (e) => {
    e.preventDefault();
    // Handle add species logic
    setShowSpeciesModal(false);
    setShowAlert(true);
    setSuccessMessage('Species added successfully!');
  };

  const handleAddBreed = (e) => {
    e.preventDefault();
    // Handle add breed logic
    setShowBreedModal(false);
    setShowAlert(true);
    setSuccessMessage('Breed added successfully!');
  };

  return (
    <>
      <Container>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <h1>Dashboard</h1>
          <div>
            <Button variant="primary" onClick={() => setShowSpeciesModal(true)}>Add Species</Button>
            <Button variant="success" onClick={() => setShowBreedModal(true)}>Add Breed</Button>
            <Button variant="info" onClick={() => setShowOwnerModal(true)}>Add Owner</Button>
          </div>
        </div>
        <div className="mt-5">
          <Form.Group controlId="filterType">
            <Form.Label>Select Filter</Form.Label>
            <Form.Control as="select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="pets">Pets</option>
              <option value="species">Species</option>
              <option value="breeds">Breeds</option>
              <option value="owners">Owners</option>
            </Form.Control>
          </Form.Group>
        </div>

        {/* Alert for success messages */}
        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            {successMessage}
          </Alert>
        )}

        {/* Display Area */}
        <div className="mt-5">
          {filterType === 'pets' && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Pet Name</th>
                  <th>Species</th>
                  <th>Breed</th>
                  <th>Date of Birth</th>
                  <th>Owner</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pets.map((pet) => (
                  <tr key={pet.PetID}>
                    <td>{pet.PetName}</td>
                    <td>{species.find(s => s.SpeciesID === pet.SpeciesID)?.SpeciesName}</td>
                    <td>{breeds.find(b => b.BreedID === pet.BreedID)?.BreedName}</td>
                    <td>{pet.DateOfBirth}</td>
                    <td>{owners.find(o => o.OwnerID === pet.OwnerID)?.OwnerName}</td>
                    <td>
                      <Button variant="warning" onClick={() => { setFormData(pet); setShowPetModal(true); }}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {filterType === 'species' && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Species Name</th>
                </tr>
              </thead>
              <tbody>
                {species.map((s) => (
                  <tr key={s.SpeciesID}>
                    <td>{s.SpeciesName}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {filterType === 'breeds' && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Breed Name</th>
                  <th>Species</th>
                </tr>
              </thead>
              <tbody>
                {breeds.map((b) => (
                  <tr key={b.BreedID}>
                    <td>{b.BreedName}</td>
                    <td>{species.find(s => s.SpeciesID === b.SpeciesID)?.SpeciesName}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {filterType === 'owners' && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Owner Name</th>
                  <th>Contact Details</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {owners.map((o) => (
                  <tr key={o.OwnerID}>
                    <td>{o.OwnerName}</td>
                    <td>{o.OwnerContactDetails}</td>
                    <td>{o.OwnerAddress}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>

        {/* Pet Modal */}
        <Modal show={showPetModal} onHide={() => setShowPetModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{formData.PetID ? 'Edit Pet' : 'Add Pet'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddOrEditPet}>
              <Form.Group controlId="petName">
                <Form.Label>Pet Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter pet name"
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
                  <option value="">Select Species</option>
                  {species.map((species) => (
                    <option key={species.SpeciesID} value={species.SpeciesID}>
                      {species.SpeciesName}
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
                  <option value="">Select Breed</option>
                  {breeds.map((breed) => (
                    <option key={breed.BreedID} value={breed.BreedID}>
                      {breed.BreedName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
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
                  <option value="">Select Owner</option>
                  {owners.map((owner) => (
                    <option key={owner.OwnerID} value={owner.OwnerID}>
                      {owner.OwnerName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                {formData.PetID ? 'Update Pet' : 'Add Pet'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Owner Modal */}
        <Modal show={showOwnerModal} onHide={() => setShowOwnerModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Owner</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddOwner}>
              <Form.Group controlId="ownerName">
                <Form.Label>Owner Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter owner name"
                  value={ownerFormData.ownerName}
                  onChange={(e) => setOwnerFormData({ ...ownerFormData, ownerName: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="ownerContactDetails">
                <Form.Label>Contact Details</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter contact details"
                  value={ownerFormData.ownerContactDetails}
                  onChange={(e) => setOwnerFormData({ ...ownerFormData, ownerContactDetails: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="ownerAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
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

        {/* Species Modal */}
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

        {/* Breed Modal */}
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
              <Form.Group controlId="speciesID">
                <Form.Label>Species</Form.Label>
                <Form.Control
                  as="select"
                  value={breedFormData.speciesID}
                  onChange={(e) => setBreedFormData({ ...breedFormData, speciesID: e.target.value })}
                >
                  <option value="">Select Species</option>
                  {species.map((s) => (
                    <option key={s.SpeciesID} value={s.SpeciesID}>
                      {s.SpeciesName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Breed
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}
