import React,{useState, useEffect} from 'react';
import {Form, Navbar, Container, Card, Table, Modal, Button, Nav} from 'react-bootstrap';

const Navigation = () => {
    return (<div class="fixed-top">
        
        <Navbar bg="success" >
               <Navbar.Brand href="/">
                  MoniDinau
               </Navbar.Brand>
                       <Nav.Link href="#moreInfo">
                           More Info
                       </Nav.Link>
        </Navbar>
           
           </div>
           )
};

const BackdropImage = () => {
    return (
    <>
    <Card><div class="overlay"></div>
    <Card.Img src="2.jpg"/>
    <Card.ImgOverlay>
        <Container>
            <br/>
        <div id="description">
    <Card.Title><h1 align="center" color="#ced4da">Welcome to MoniDinau</h1></Card.Title>
    <br/><br/>
    <Card.Text>
        <h3 align="center">
            <p align="center" color="#ced4da">MoniDinau is a mini microfinance entity made up of a network of 
        individual money lenders within the informal sector who offer financial assistance to the working 
        class population. To our valued clients, we represent Consistency and Convenience. </p>
        <div align="center"><ApplyModal/>
        </div></h3></Card.Text >
        </div>
        </Container>
        
        </Card.ImgOverlay>
   </Card>
   </>
 )
}

const Content = () => {
    return (<Container>
        <a id="moreInfo"></a>
        <br/>
        <br/>
        <br/>
        <PlanTable/>
        <FAQ/>
        

        </Container>)
};

const Footer = () => {
    return (
        <>
        <Card bg="dark">
            <Card.Body variant="dark" >
               
            </Card.Body>
       </Card>
       </>
        )
};

const ApplyForm = () => {

   return (<Form method='POST' action='http://localhost:8008/api' enctype="multipart/form-data" >
            <fieldset>
				<legend>
				Your Details:
				</legend>
				<label>Fullname:<br /><input type="text" name="fullname" size="30" maxlength="100" required/></label>
                
				<label>Email:<br /><input type="email" name="email" id="email" size="30" maxlength="100" required/></label>
				<br/>
				<label>Company/Position:<br /><input type="text" name="employer" size="30" maxlength="100" required/></label>
				<br/>
				<label>Job office location(point of exchange):<input type="text" name="office_loc" size="30" maxlength="100" required/></label>
				<br/>                
				<label for="comments">Describe the item/s being offered as collateral for the intended loan(Laptops, Gaming consoles, DSLR camera, Drones etc):
				*note-you will need to provide a clear receipt for these items,
				stolen items will not be accepted as collateral:</label>
				<br/>
				<textarea rows="4" cols="40" name="itemcomments" id="itemcomments" ></textarea>
				<br/>
				<label>Amount of money to be loaned from MoniDinau:<input type="number" name="loan" id="loan" size="30" maxlength="100" required/></label>
			<label>When do you need the funds by(set a date):<input type="date" name="loandate" size="30" maxlength="100" required/></label>
				<br/>
			
                <label>Time-frame package of repayment that you are comfortable with?(choose one):</label>
				<select name="packageplan" id="plan" required>
				<option value="4weekly payments">4weekly payments</option>
				<option value="2fortnightly payments">2fortnightly payments</option>
				<option value="1time payment">1time payment</option>
				</select>

                
				</fieldset>

                <br />
				<fieldset>
				<p>
				<label for="hear-about">How did you hear about us?</label>
				<select name="referrer" id="referrer" >
				<option value="social_media">Social media</option>
				<option value="friend">Friend</option>
				<option value="advert">Advert</option>
				<option value="other">Other</option>
				</select>
				</p>
				


				<br />
				
				</fieldset>

                take a picture of the item:<br/>
				  <input type="file" name="item_pic" id="file" size="10" multiple />
                  <br/>
                  <Button variant="primary" type="submit" >
                   Confirm
                  </Button>
                  
            </Form>
            )
};

const ApplyModal = () => {
    const [show,setShow] = useState(false);
    const handleClose = ()=>{setShow(false)};
    const handleShow = ()=>{setShow(true)};
    
    
    return (<>
    <Button variant="outline-light" bg="light" size="lg" block onClick={handleShow}><h3>Apply for Loan</h3></Button>
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Loan Application</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <ApplyForm/>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                   Close
                  </Button>
                  
            </Modal.Footer>

          </Modal>
    </>)
};

const PlanTable = () => {
    return(
        <>
        
        <h3 align="center">MoniDinau Loans</h3>
			
				<p> We offer Flexible loan packages within the range of K50 - K1000 with a variety of interest rates. All loans taken out have a mandatory time frame of one month to be repaid in full. There are flexible time frames of days or weeks for your repayment plans within the given month period.
                We are based and operate within the city limits of Port Moresby(PNG) only.<br/></p>
                  <h4 justify-self="center">Plans</h4>
				
				<Table striped bordered hover variant="info">
                    
				<tr><td>K50 - K499 </td><td> 30% fixed interest rate(no accumulation) </td></tr>
				<tr><td>K500 - K999 </td><td> 20% fixed interest rate(no accumulation) </td></tr>
				<tr><td> K1000 and greater </td><td> 10% compounded interest rate(accumulates fortnightly)</td></tr>
				</Table>
        <p> 
            </p>

          </>)
}

const FAQ = ()=>{
    return (<>
				<h4 >Acquiring the approved funds:</h4>
				<p>The approved funds will be exchanged for <b><u>the offered collateral item/s</u></b> at a central, convenient location  during any available free time of your choosing. The collateral items will also be returned to you at the same location upon completion of the repayment of funds.</p>
				<h4 >Re-payment methods:</h4>
				<p><b>Mobile-banking-</b>The payments of loans can be done through respective mobile-banking services. A reciept will be given confirming the transaction and should be kept for safe keeping until the repayment of the loan is complete.
				<br/><b>In person-</b>Payments are accepted in cash at a convenient central location during any of your free or off duty times.
				</p>
				<h4 >non-payment or defaults:</h4>
				<p>Any costs induced by defaulting on the loan repayment plan or non-repayment will automatically be recovered through the items presented as collateral.
				<br/></p>

    </>)
}

const App = () => {
    return(
        <>
        <Navigation/>
        <br/>
        <br/>
        <BackdropImage/>
        <Content/>
        <Footer/>
        </>
        );
};

export default App;
