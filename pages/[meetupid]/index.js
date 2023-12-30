import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetails";
import { MongoClient , ObjectId } from "mongodb";
import Head from 'next/head';

function meetupID(props){
    return(
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description}/>
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>    
    );
}
export async function getStaticPaths(){

    const client = await MongoClient.connect('mongodb+srv://shrey0511:shanu0511@cluster0.ynclavl.mongodb.net/meetups?retryWrites=true&w=majority');
        
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({},{_id : 1}).toArray();

    client.close();
    return{
        fallback: 'blocking',
        paths:meetups.map((meetup)=>({
            params:{meetupid:meetup._id.toString()}
        })),
    };
}


export async function getStaticProps(context){
    //fetch data from api about a certain meetup

    const meetupid = context.params.meetupid;

    const client = await MongoClient.connect('mongodb+srv://shrey0511:shanu0511@cluster0.ynclavl.mongodb.net/meetups?retryWrites=true&w=majority');
        
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({
        _id: new ObjectId(meetupid),
    });

    client.close();

    return{
        props:{
            meetupData:{
                id : selectedMeetup._id.toString(),
                image: selectedMeetup.image,
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                description:selectedMeetup.description,
            },
        },
    };
}

export default meetupID;