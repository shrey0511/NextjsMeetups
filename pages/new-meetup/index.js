
// our-domain.com/new-meetup
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm"
import { Fragment } from "react";
import Head from 'next/head';

function newMeetupPage(){
    
    const router = useRouter();

    async function meetUpHandler(meetupData){
        const response = await fetch('/api/new-meetup',{
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        router.push('/');
    }
    return(
        <Fragment>
            <Head>
                <title>Add your meetup</title>
                <meta name="description" content="Add your meetups and make creative website"/>
            </Head>
            <NewMeetupForm onAddMeetup={meetUpHandler}/>
        </Fragment>
    ); 

        
}
export default newMeetupPage;