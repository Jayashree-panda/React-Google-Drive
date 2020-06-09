
import axios from 'axios'; 
  
import React,{Component} from 'react'; 
import $ from 'jquery';
class App extends Component { 
   
    state = { 
  
      // Initially, no file is selected 
      selectedFile: null,
      formdata:{'myFile':''},
      isData: false,
      url: ''
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
      $.ajax({
        url: 'http://localhost:4000/uploadFile',
        type: 'POST',
        contentType: false,
        dataType:'json',
        data: JSON.stringify(formData),
        
        success: function(data) {
          console.log('success');
          console.log(JSON.stringify(data));
          let datas = JSON.stringify(data)
          this.setState({ url: datas })
          this.setState({ isData: true })
      }.bind(this),
      error:function(err){
        console.log(err)
      }
      })
   }; 

    

    fileData = () => { 
     
      if (this.state.selectedFile) { 
          
        return ( 
          <div> 
            <input type="file" onChange={this.onFileChange} /> 
                <button onClick={this.onFileUpload}> 
                  Upload! 
                </button> 
            <h2>File Details:</h2> 
            <p>File Name: {this.state.selectedFile.name}</p> 
            <p>File Type: {this.state.selectedFile.type}</p> 
            <p> 
              Last Modified:{" "} 
              {this.state.selectedFile.lastModifiedDate.toDateString()} 
            </p> 
          </div> 
        ); 
      } else { 
        return ( 
          <div> 
            <input type="file" onChange={this.onFileChange} /> 
                <button onClick={this.onFileUpload}> 
                  Upload! 
                </button> 
            <br /> 

            <h4>Choose before Pressing the Upload button</h4> 
          </div> 
        ); 
      } 
    }; 
    dataShow = () =>{
      if(this.state.isData){
      let mystring = this.state.url.substring(1, this.state.url.length - 1);
      var link = <a href={ mystring } className = "anchorTag">{ mystring }</a>;
      $(function(){
        window.location.href = $('.anchorTag').attr('href');
    });
  }
    }
    render() { 
     
      return ( 
        <div>   
            <h3> 
              File Upload using React! 
            </h3> 
            <div> 
                
            </div> 
          {this.fileData()} 
          {this.dataShow()}
        </div> 
      ); 
    } 
  } 
  
  export default App; 
