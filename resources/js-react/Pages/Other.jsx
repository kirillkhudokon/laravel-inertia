import { useState } from 'react';
import DefaultLayout from '../Layouts/DefaultLayout';

export default function OtherPage(){
	const [ name, setName ] = useState('');

	return <DefaultLayout>
		<input value={name} onChange={e => setName(e.target.value.trim())} />
		{ name.length > 0 && <div>
			Hello, { name }
		</div> }
	</DefaultLayout>
}