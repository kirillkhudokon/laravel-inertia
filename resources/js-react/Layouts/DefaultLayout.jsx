import { Link } from '../Components';
import '../../css/app.css';

export default function DefaultLayout({ children }){
	return <>
		<div className="section-header">
			<div className="container">
				<h2 className="mb-0">Laravel Inertia Blog</h2>
			</div>
		</div>
		<div className="section-nav">
			<div className="container">
				<Link href="/" variant="button">
					Главная
				</Link>
				<Link href="/posts/create" variant="button">
					Создать пост
				</Link>
			</div>
		</div>
		<div className="min-height-screen">
			{ children }
		</div>
		<div className="section-footer">
			<div className="container text-center">
				<p className="mb-0 text-muted">© 2025 Laravel Inertia Blog</p>
			</div>
		</div>
	</>
}