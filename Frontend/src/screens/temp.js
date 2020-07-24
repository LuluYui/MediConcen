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

     .then(res => {
      alert(res);
      res.json();
    })
    .then(
      (res) => {
        alert(JSON.stringify(res));
        alert('something happened');
        this.setState({
          isLoaded: true,
          items: {name: 'haha'},
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
        
        });
      }

    )