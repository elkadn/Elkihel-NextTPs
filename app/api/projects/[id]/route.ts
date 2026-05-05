import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

function readDB() {
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    return data;
}

function writeDB(data: any) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const db = readDB();
    const projectIndex = db.projects.findIndex((p: any) => p.id === id);

    if (projectIndex === -1) {
        return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
    }

    db.projects.splice(projectIndex, 1);
    writeDB(db);

    return NextResponse.json({ message: 'Projet supprimé' });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json();
    const db = readDB();
    const projectIndex = db.projects.findIndex((p: any) => p.id === id);

    if (projectIndex === -1) {
        return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
    }

    db.projects[projectIndex] = {
        ...db.projects[projectIndex],
        name: body.name || db.projects[projectIndex].name,
        color: body.color || db.projects[projectIndex].color,
    };

    writeDB(db);

    return NextResponse.json(db.projects[projectIndex]);
}