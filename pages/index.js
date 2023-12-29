//our-domain.com
// import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from 'next/head';
import { Fragment } from "react";


function homePage(props){
    // const [loadedData,setloadedData] = useState([]);

    // useEffect(()=>{
    //     setloadedData(DUMMY_Meetups);
    // },[]);

    return(
        <Fragment>
            <Head>
            <title>React Meetups</title>
            <meta name="description" content="This is our main page containing all meetups"/>
            </Head>
            <MeetupList 
                meetups={props.meetups}>
            </MeetupList>
        </Fragment>   
    );    
}
//If we want our website to dynamically revalidate in every request then we need server side
// rendering and for that we use getServerSideProps.

// export async function getServerSideProps(context){
//     const req = context.req;
//     const res = context.res;
    
//     //fetch date from API
//     return{
//         props:{
//             meetups:DUMMY_Meetups
//         }
//     };
// }

//In this case we can use getStaticProps because we dont need to dynamically revalidate data
//with present time 

export async function getStaticProps(){
    //fetch data from API
    const client = await MongoClient.connect('mongodb+srv://shrey0511:shanu0511@cluster0.ynclavl.mongodb.net/meetups?retryWrites=true&w=majority');
        
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return{
        props:{
            meetups: meetups.map((meetup)=>({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate:1    
    };
}    


export default homePage;