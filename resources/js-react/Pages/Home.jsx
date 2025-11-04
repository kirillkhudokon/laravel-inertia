import { useContext } from 'react';
import DefaultLayout from '../Layouts/DefaultLayout';
import { HttpContext } from '../contexts/HttpContext';

export default function HomePage({ a }){
	const http = useContext(HttpContext);
	console.log(http.id)

	return <DefaultLayout>
		<div>
			{ a }
		</div>
	</DefaultLayout>
}