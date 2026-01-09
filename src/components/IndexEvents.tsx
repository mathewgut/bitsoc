// container events are stored in for main page
import CardCarousel from "./CardCarousel";


const dummyEvents = [
	{
		title: "Event 2",
		date: "2024-10-15",
		description: "Description for Event 2",
		image:"/assets/lego_23.jpg"
	},
	{
		title: "Event 2",
		date: "2024-10-15",
		description: "Description for Event 2",
		image:"/assets/lego_23.jpg"
	},
	{
		title: "Event 2",
		date: "2024-10-15",
		description: "Description for Event 2",
		image:"/assets/lego_23.jpg"
	},
	{
		title: "Event 2",
		date: "2024-10-15",
		description: "Description for Event 2",
		image:"/assets/lego_23.jpg"
	},
	{
		title: "Event 2",
		date: "2024-10-15",
		description: "Description for Event 2",
		image:"/assets/lego_23.jpg"
	},
	{
		title: "Event 2",
		date: "2024-10-15",
		description: "Description for Event 2",
		image:"/assets/lego_23.jpg"
	},
];


export default function IndexEvents() {

	 return (
		<section className="relative flex justify-center w-full py-5 bg-linear-0 px-20">
			<CardCarousel cardType="event" />

			<div className="absolute hidden sm:block bottom-0 right-0 bg-bitsoc-lblue h-50 w-50 sm:h-40 sm:w-40 rounded-full -z-10"/>
			<div className="absolute sm:-top-20 sm:-left-10 bg-bitsoc-lblue h-70 w-70 rounded-full -z-10"/>
		</section>
  )



}