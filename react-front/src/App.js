
import axios from 'axios';

import React, { Component } from 'react';
class App extends Component {

  state = {

    // Initially, no file is selected 
    selectedFile: null,
    formdata: { 'myFile': '' },
    isData: false,
    // url: ''
  };

  // On file select (from the pop up) 
  onFileChange = event => {

    // Update the state 
    this.setState({ selectedFile: event.target.files[0] }); //this working

  };

  // On file upload (click the upload button) 
  onFileUpload = () => {

    console.log(this.state.selectedFile)
    const formData = new FormData();

    // Update the formData object 
    formData.append(
      "myFile",
      this.state.selectedFile
    );

    for (var value of formData.values()) {
      console.log(value);
    }
    axios.post(
      "http://localhost:4000/uploadFile",
      formData
    ).then(res => {
      console.log("data", res.data);
      window.location.href = res.data;
      this.setState({ isData: true })
    }).catch(err => {
      console.log(err)
    })
    // $.ajax({
    //   url: 'http://localhost:4000/uploadFile',
    //   type: 'POST',
    //   contentType: false,
    //   dataType:'json',
    //   data: JSON.stringify(formData),

    //   success: function(data) {
    //     console.log('success');
    //     console.log("data", data);
    //     console.log(JSON.stringify(data));
    //     let datas = JSON.stringify(data)
    //     // window.location.href = datas;
    //     this.setState({ url: datas })
    //     this.setState({ isData: true })
    // }.bind(this),
    // error:function(err){
    //   console.log(err)
    // }
    // })
  };



  fileData = () => {
    if (!this.state.selectedFile) {
      return (
        <div>
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }

    return (
      <div>
        <h2>File Details:</h2>
        <p>File Name: {this.state.selectedFile.name}</p>
        <p>File Type: {this.state.selectedFile.type}</p>
        {this.state.selectedFile.lastModifiedDate
          && <p>
            Last Modified: {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        }
      </div>
    );
  };
  // dataShow = () => {
  //   let mystring = this.state.url.substring(1, this.state.url.length - 1);
  //   var link = <a href={mystring} className="anchorTag">{mystring}</a>;
  //   if (this.state.isData) {
  //     return <div>Please authorize here {link}</div>;
  //   }
  // }
  render() {

    return (
      <div>
        <h1>
          GeeksforGeeks
            </h1>
        <h3>
          File Upload using React!
            </h3>
        <div>

        </div>
        <input type="file" onChange={this.onFileChange} />
        <button disabled={!this.state.selectedFile} onClick={this.onFileUpload}>
          Upload!
        </button>
        {this.fileData()}
        {/* {this.dataShow()} */}
      </div>
    );
  }
}

export default App; 
