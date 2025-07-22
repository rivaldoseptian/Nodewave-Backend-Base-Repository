import db from "../utils/db";

export async function saveFileMeta(filename: string) {
  const [file] = await db("files")
    .insert({ filename, status: "pending" })
    .then((ids) =>
      db("files").where("id", ids[0]).select("id", "filename", "status")
    );
  return file;
}

export async function processFileAsync(fileId: number) {
  setTimeout(async () => {
    const mockData = [
      { name: "User A", value: "Data A" },
      { name: "User B", value: "Data B" },
    ];

    for (let i = 0; i < mockData.length; i++) {
      await db("file_data").insert({
        file_id: fileId,
        row: i + 1,
        name: mockData[i].name,
        value: mockData[i].value,
      });
    }

    await db("files").where({ id: fileId }).update({ status: "success" });
  }, 2000);
}

export async function getFiles({ page, limit, status, filename }: any) {
  let query = db("files");

  if (status) query = query.where("status", status);
  if (filename) query = query.where("filename", "like", `%${filename}%`);

  const totalResult = await query.clone().count("* as total").first();
  const data = await query.limit(limit).offset((page - 1) * limit);

  return {
    total: Number(totalResult?.total || 0),
    data,
  };
}
