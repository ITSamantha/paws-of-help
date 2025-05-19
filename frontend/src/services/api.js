import axios from 'axios';

export const getPetTypes = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/pets/types`, {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getBloodRhesuses = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/pets/blood/rhesuses`, {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getBloodComponents = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/pets/blood/components`, {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getBreeds = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/pets/breeds/types`, {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


// Blood

export const getBloodGroupsByPetType = async (petTypeId) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/pets/blood/groups?pet_type_id=${petTypeId}`, {
    headers: {
      'X-API-Key': import.meta.env.VITE_API_KEY,
    },
  });
  return response.data;
};

export const getBloodGroups = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/pets/blood/groups`, {
    headers: {
      'X-API-Key': import.meta.env.VITE_API_KEY,
    },
  });
  return response.data;
};

export const getGonorStatuses = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/donors/statuses`, {
    headers: {
      'X-API-Key': import.meta.env.VITE_API_KEY,
    },
  });
  return response.data;
};


// Breed

export const getBreedsByPetType = async (petTypeId) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/pets/breeds/types?pet_type_id=${petTypeId}`, {
    headers: {
      'X-API-Key': import.meta.env.VITE_API_KEY,
    },
  });
  return response.data;
};


export const getPets = async (limit, offset) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/pets`, {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      },
      params: {
        limit,
        offset
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRecipients = async (limit, offset, filters) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/recipients`, {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      },
      params: {
        limit,
        offset,
         ...filters
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDonors = async (limit, offset, filters) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/donors`, {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      },
      params: {
        limit,
        offset,
        ...filters
      }
    });
    console.log('getDonors API response:', response);
    return response.data;
  } catch (error) {
    console.error('getDonors API error:', error);
    return [];
  }
};

export const getRecipientById = async (recipientId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/recipients/${recipientId}`, {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPetById = async (petId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/pets/${petId}`, {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getPetsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/pets?user_id=${userId}`, {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postPet = async (petData) => {
  try {
    petData.age =  parseInt(petData.age);
    petData.weight = parseFloat(petData.weight);

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/pets`,
    petData,
    {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateDonor = async (donorId, donorData) => {
  try {
    console.log(donorData)
    const response = await axios.patch(`${import.meta.env.VITE_API_URL}/donors/${donorId}`,
    donorData,
    {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};



// Locations

export const getCities = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/locations/cities`, {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRegions = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/locations/regions`, {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Clinics
export const getClinics = async (isVerified = true) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/clinics?is_verified=${isVerified}`, {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postClinic = async (clinicData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/clinics`,
    clinicData,
    {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const verifyClinic = async (clinicId) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/clinics/${clinicId}/approve`,
    {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deletePet = async (petId) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/pets/${petId}`,
    {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRecipient = async (recipientId) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/recipients/${recipientId}`,
    {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteDonor = async (donorId) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/donors/${donorId}`,
    {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

// Auth
export const loginUser = async (data) => {
    try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data, {
            headers: { 'X-API-Key': import.meta.env.VITE_API_KEY}
        });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const meUser = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
            headers: { 
                'X-API-Key': import.meta.env.VITE_API_KEY,
                Authorization: `Bearer ${token}`,
            }
        });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const registerUser = async (data) => {
  try {
    console.log(data)
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data, {
            headers: { 'X-API-Key': import.meta.env.VITE_API_KEY }
        });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postRecipient = async (recipientData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/recipients`,
    recipientData,
    {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const postDonor = async (donorData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/donors`,
    donorData,
    {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

