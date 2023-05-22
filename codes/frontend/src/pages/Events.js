import { useLoaderData, json, defer, Await } from "react-router-dom";
import { Suspense } from "react";
import EventsList from "../components/EventsList";

function EventsPage() {
  const { events } = useLoaderData(); // return the final data which we the loader function returns
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  // const events = data.events;
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loding soon...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });
    throw json({ message: "Could not fetch events." }, { status: 500 });
    // return { isError: true, message: "Could not fetch events." };
  } else {
    const resData = await response.json();
    return resData.events;
    // const resData = await response.json();
    // const res = new Response('any data', { status: 201 });
    // return res;
  }
}

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};
