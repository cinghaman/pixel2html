<?php
$name = $_POST['fullname'];
$username = $_POST['username'];
$email_address = $_POST['email'];
$country = $_POST['country'];
$city = $_POST['city'];
	
// Create the email and send the message
$to = 'aman@amancingh.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "New Signup by:  $name";
$email_body = "You have received a new signup from your website.\n\n"."Here are the details:\n\nName: $name \n\nUsername: $username \n\nEmail: $email_address \n\nCity: $city \n\nCountry: $country";
$headers = "From: aman@amancingh.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";	
mail($to,$email_subject,$email_body,$headers);
return true;			
?>