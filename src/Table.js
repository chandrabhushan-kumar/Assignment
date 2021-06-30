import React,{Component} from 'react';
import './Table.css';
import Axios from 'axios';
import Swal from 'sweetalert2';


export default class Table extends Component{

    constructor(props){
		super(props);

		this.state = {
           ownerinfo  : [],
			Details : []
			
		}
    }ownerinfo
    componentDidMount(){
		 this.getData();
    }
    getData(){
		Axios.get("https://api.github.com/users/hacktivist123/repos")
			 .then((response)=>{
			 	console.log("response = ",response);
			 	  if(response.data){
			 	  	this.setState({
                           Details : response.data,
                           ownerinfo : response.data
			 	 	});
				  }
				 
			 })
			 .catch((error)=>{
			 	console.log("Error during get Data = ", error);
			 	Swal.fire("Oops...","Something went wrong! <br/>"+error, "error");
			 });		
    }
    getownerinfo = (event)=>{
        var ownerinfo = this.state.ownerinfo;
         var node_id = event.currentTarget.id;
         console.log("node_id",node_id)
         var finddata = ownerinfo.find(data =>{
             return data.node_id === node_id
         })
         console.log("node_id",finddata)
         alert( "Fullname =" + " " +finddata.full_name)

    }
    render(){
        return(
            <div className ="pagewrapper slist">
               <table className="table table-stripped table-hovered table-bordered customcss">
                   <thead>
                       <tr>
                       <th>
                               Sr No
                           </th>
                           <th>
                               Node_id
                           </th>
                           <th>
                              Name
                           </th>
                       </tr>

                   </thead>
                   <tbody>
                            {
                                this.state.Details.length > 0
                                ?
                                    this.state.Details.map((detail,index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td><div id={detail.node_id} onClick={this.getownerinfo.bind(this)}>{detail.node_id }</div></td>
                                                <td>{detail.name}</td>
                                            </tr>

                                        )

                                    })
                                :
                                <tr> 
										<td colSpan="3"> Sorry... No Data available! </td>
									</tr>
		
                             }
                        </tbody>
               </table>
            </div>
        )
    }

}
