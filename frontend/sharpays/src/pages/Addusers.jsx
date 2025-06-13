import Titulo from "../components/CustomTitle";
import InputText from "../components/CustomInput";
import Button from "../components/CustomButton";

const usersData = [
  {
    id: "10-02-23",
    nombre: "Bougies",
    correo: "martha Lopez"
  }
  // Puedes agregar más usuarios aquí
];

const UsersTable = () => (
  <div className="bg-white rounded-2xl shadow-lg p-8">
    <div className="mb-4">
      <InputText
        type="text"
        name="buscar"
        placeholder="Buscar"
        className="w-full bg-gray-100 rounded-xl px-4 py-2"
      />
    </div>
    <table className="w-full text-left">
      <thead>
        <tr>
          <th className="py-2 px-4 font-semibold text-gray-700">id</th>
          <th className="py-2 px-4 font-semibold text-gray-700">nombre</th>
          <th className="py-2 px-4 font-semibold text-gray-700">Correo</th>
          <th className="py-2 px-4"></th>
          <th className="py-2 px-4"></th>
        </tr>
      </thead>
      <tbody>
        {usersData.map((user) => (
          <tr key={user.id} className="border-t">
            <td className="py-3 px-4 font-bold">{user.id}</td>
            <td className="py-3 px-4">{user.nombre}</td>
            <td className="py-3 px-4">{user.correo}</td>
            <td className="py-3 px-4">
              <Button
                text="Editar"
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg px-6 py-2 shadow transition"
              />
            </td>
            <td className="py-3 px-4">
              <Button
                text="Eliminar"
                className="border border-pink-500 text-pink-500 bg-white font-semibold rounded-lg px-6 py-2 shadow transition hover:bg-pink-50"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UsersTable;
