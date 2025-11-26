async function createKomik(database, komikData) {
    const { judul, deskripsi, penulis, imageType, imageName, imageData } = komikData;

    if (!judul || !deskripsi || !penulis) {
        throw new Error('Title, description, dan author wajib diisi.');
    }

    const newKomik = await database.Komik.create({
        judul,
        deskripsi,
        penulis,
        imageType: imageType || null,
        imageName: imageName || null,
        imageData: imageData || null,
    });

    return newKomik;
}

async function getAllKomik(database) {
    const komiks = await database.Komik.findAll();

    return komiks.map((k) => {
        const obj = k.toJSON ? k.toJSON() : Object.assign({}, k);
        if (obj.imageData) obj.imageData = Buffer.from(obj.imageData).toString('base64');
        return obj;
    });
}

async function getKomikById(database, id) {
    const komik = await database.Komik.findByPk(id);
    if (!komik) throw new Error('Komik tidak ditemukan');

    const obj = komik.toJSON ? komik.toJSON() : Object.assign({}, komik);
    if (obj.imageData) obj.imageData = Buffer.from(obj.imageData).toString('base64');
    return obj;
}

async function updateKomik(database, id, komikData) {
    const komik = await database.Komik.findByPk(id);
    if (!komik) throw new Error('Komik tidak ditemukan');

    const updatable = {};
    ['judul', 'deskripsi', 'penulis', 'imageType', 'imageName', 'imageData'].forEach(
        (key) => {
            if (komikData[key] !== undefined) updatable[key] = komikData[key];
        }
    );

    await komik.update(updatable);
    const updated = komik.toJSON ? komik.toJSON() : Object.assign({}, komik);
    if (updated.imageData) updated.imageData = Buffer.from(updated.imageData).toString('base64');
    return updated;
}

async function deleteKomik(database, id) {
    const komik = await database.Komik.findByPk(id);
    if (!komik) throw new Error('Komik tidak ditemukan');

    await komik.destroy();
    return { message: 'Komik berhasil dihapus' };
}

module.exports = {
    createKomik,
    getAllKomik,
    getKomikById,
    updateKomik,
    deleteKomik,
};



