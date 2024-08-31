'use client';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';
import './globals.css';
import { toast } from 'sonner';
import axios from 'axios';

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

  const fetchPets = async () => {
    try {
      const url = 'http://localhost/api/assignment3/pets.php';
      const formData = new FormData();
      formData.append("operation", "getPetDetails");
      const res = await axios.post(url, formData);
      console.log("RES NI FETCH PETS", res.data)
      if (res.data !== 0) {
        setPets(res.data)
      }

    } catch (error) {
      toast.error("walay network")
      console.log(error)

    }
  };


  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const formData = new FormData();
        formData.append("operation", "getSpeciesDetails");
        const response = await axios.post("http://localhost/api/assignment3/pets.php", formData);
        console.log("Response Data:", response.data);

        const speciesData = response.data !== 0 ? response.data : [];
        setSpecies(speciesData);
      } catch (error) {
        console.error("Error fetching species data:", error);
      }
    };

    fetchSpecies();
    fetchOwners();
  }, []);
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const formData = new FormData();
        formData.append("operation", "getBreedDetails");
        const response = await axios.post("http://localhost/api/assignment3/pets.php", formData);
        console.log("Response Data ni fetchbreed:", response.data);

        const breedData = response.data !== 0 ? response.data : [];
        setBreeds(breedData);
      } catch (error) {
        console.error("Error fetching breed data:", error);
      }
    };
    fetchBreeds();
  }, []);



  const fetchOwners = async () => {
    try {
      const url = 'http://localhost/api/assignment3/pets.php';
      const formData = new FormData();
      formData.append("operation", "getOwnerDetails");
      const res = await axios.post(url, formData);
      console.log("resdata ni fetchowners:", res.data)
      if (res.data !== 0) {
        setOwners(res.data);
      }

    } catch (error) {
      toast.error("walay network")
      console.log(error)

    }
  };

  const handleAddOrEditPet = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost/api/assignment3/pets.php';
      const jsonData = {
        pet_name: formData.name,
        species_id: formData.speciesID,
        breed_id: formData.breedID,
        date_of_birth: formData.dateOfBirth,
        owner_id: formData.ownerID
      }
      console.log("JSON DATA NI ADDSPEssssCIES:", JSON.stringify(jsonData))
      const formDatas = new FormData();
      formDatas.append("json", JSON.stringify(jsonData));
      formDatas.append("operation", "addPets");
      const res = await axios.post(url, formDatas);
      console.log("res.data ni add Pets", res)
      if (res.data === 1) {
        toast.success('Pet added successfully!');
      }

    } catch (error) {
      toast.error("walay networks111")
      console.log("error", error)

    }
  }



  const handleAddOwner = async (e) => {
    e.preventDefault();

    try {
      const url = 'http://localhost/api/assignment3/pets.php';
      const jsonData = {
        owner_name: ownerFormData.ownerName,
        owner_contact_details: ownerFormData.ownerContactDetails,
        owner_address: ownerFormData.ownerAddress

      }
      console.log("JSON DATA NI ADDowner:", JSON.stringify(jsonData))
      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));
      formData.append("operation", "addOwners");
      const res = await axios.post(url, formData);
      console.log(res.data)
      if (res.data === 1) {
        toast.success('Owner added successfully!');
      }

    } catch (error) {
      toast.error("walay network")
      console.log(error)

    }
  }


  const handleAddSpecies = async (e) => {
    e.preventDefault();

    try {
      const url = 'http://localhost/api/assignment3/pets.php';
      const jsonData = {
        species_name: speciesFormData.speciesName
      }
      console.log("JSON DATA NI ADDSPECIES:", JSON.stringify(jsonData))
      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));
      formData.append("operation", "addSpecies");
      const res = await axios.post(url, formData);
      console.log("res.data ni add species", res)
      if (res.data === 1) {
        toast.success('Species added successfully!');
      }

    } catch (error) {
      toast.error("walay network")
      console.log(error)

    }
  }



  const handleAddBreed = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost/api/assignment3/pets.php';
      const jsonData = {
        breed_name: breedFormData.breedName,
        species_id: breedFormData.speciesID
      }
      console.log("JSON DATA NI ADDBREED:", JSON.stringify(jsonData))
      const formDatas = new FormData();
      formDatas.append("json", JSON.stringify(jsonData));
      formDatas.append("operation", "addBreeds");
      const res = await axios.post(url, formDatas);
      console.log(res.data)
      if (res.data === 1) {
        toast.success('Breed added successfully!');
      }

    } catch (error) {
      toast.error("walay network")
      console.log(error)

    }


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
      <Container className="mt-5" style={{ background: 'linear-gradient(to bottom, #808080  , #B2BEB5)', padding: '5px', minHeight: '100vh' }}>
        <div>
          <h1 className="text-center" style={{ color: 'white' }}>my maderpakening Pets</h1>
          <div className='button-container'>
            <Button variant="primary" onClick={() => openPetModal('add')}>Add Pet</Button>
            <Button variant="primary" onClick={openOwnerModal}>Add Owner</Button>
            <Button variant="primary" onClick={openSpeciesModal}>Add Species</Button>
            <Button variant="primary  " onClick={openBreedModal}>Add Breed</Button>
          </div>
          { }
          {/* <Form.Group controlId="filterType">
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
          </Form.Group> */}

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
                {pets.map((pet,index) => (
                  <tr key={index}>
                    <td>{pet.owner_name}</td>
                    <td>{pet.pet_name}</td>
                    <td>{pet.species_name}</td>
                    <td>{pet.breed_name}</td>
                    <td>{pet.date_of_birth}</td>
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
                  <option key={s.species_id} value={s.species_id}>
                    {s.species_name}
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
                {breeds && breeds.map((b) => (
                  <option key={b.breed_id} value={b.breed_id}>
                    {b.breed_name}
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
                  <option key={o.owner_id} value={o.owner_id}>
                    {o.owner_name}
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
                className='mb-3'
                type="text"
                placeholder="Enter breed name"
                value={breedFormData.breedName}
                onChange={(e) => setBreedFormData({ ...breedFormData, breedName: e.target.value })}
              />

              <Form.Select className='3-m' onChange={(e) => setBreedFormData({ ...breedFormData, speciesID: e.target.value })}>
                <option value="">Select species</option>
                {species.map((species) => (
                  <option key={species.species_id} value={species.species_id}>
                    {species.species_name}
                  </option>
                ))}
              </Form.Select>

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