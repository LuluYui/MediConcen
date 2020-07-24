const newData={};
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
  
     async function getRecord() {
       const response = await fetch('http://192.168.1.82:5000/consultation_record');
       const json = await response.json();
       newData = json;
     }