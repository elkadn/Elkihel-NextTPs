// interface Project {
//     id: string;
//     name: string;
//     color: string;
// }
// export default async function DashboardPage() {
//     const res = await fetch('http://localhost:4000/projects', {
//         cache: 'no-store' // SSR : toujours frais
//     });
//     const projects: Project[] = await res.json();
//     return (
//         <div style={{ padding: '2rem' }}>
//             <h1>Dashboard</h1>
//             <p>{projects.length} projets</p>
//             <ul>
//                 {projects.map(p => (
//                     <li key={p.id} style={{ marginBottom: 8 }}>
//                         <span style={{
//                             display: 'inline-block', width: 12, height: 12,
//                             borderRadius: '50%', background: p.color, marginRight: 8
//                         }} />
//                         <a href={`/projects/${p.id}`}>{p.name}</a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
import { deleteProject, renameProject } from '../actions/projects';
import AddProjectForm from './AddProjectForm';

export default async function DashboardPage() {
    const res = await fetch('http://localhost:3000/api/projects', { cache: 'no-store' });
    const projects = await res.json();

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Dashboard</h1>

            <AddProjectForm />

            <ul>
                {projects.map((p: any) => (
                    <li key={p.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                        
                        {/* Couleur */}
                        <span
                            style={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                background: p.color,
                                display: 'inline-block'
                            }}
                        />

                        {/* Nom */}
                        <a href={`/projects/${p.id}`}>{p.name}</a>

                        {/* 📝 FORM RENAME */}
                        <form action={renameProject} style={{ display: 'inline', marginLeft: 10 }}>
                            <input type="hidden" name="id" value={p.id} />
                            <input type="hidden" name="color" value={p.color} />

                            <input
                                type="text"
                                name="newName"
                                placeholder="Nouveau nom"
                                style={{ padding: '4px' }}
                            />

                            <button type="submit">Rename</button>
                        </form>

                        {/* 🗑 DELETE */}
                        <form action={deleteProject} style={{ display: 'inline' }}>
                            <input type="hidden" name="id" value={p.id} />
                            <button
                                type="submit"
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                🗑️
                            </button>
                        </form>

                    </li>
                ))}
            </ul>
        </div>
    );
}