import axios from 'axios'


export const getPromedioCategoryCode = async ()=>{

    const response = await axios.get(`http://localhost:5000/totalCategoryCode`);
    return response.data

}


export const getSumaBrandCode = async ()=>{

    const response = await axios.get(`http://localhost:5000/totalBybrandCode`);
    return response.data

}

export const getTotalCategoryCode = async ()=>{

    const response = await axios.get(`http://localhost:5000/totalBycategoryCode`);
    return response.data

}

