import Titulo from "../components/CustomTitle";
import InputText from "../components/CustomInput";
import Button from "../components/CustomButton";
import "../styles/Users.css"
const usersData = [
  {
    id: "10-02-23",
    nombre: "Bougies",
    correo: "martha Lopez"
  }
  // Puedes agregar más usuarios aquí
];

const UsersTable = () => (
  <div className="users-table-container">
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
                text={"Editar"}
                background={"#FD0053"}
                color={"white"}
                height={"40px"}
                width={"120px"}
              />
            </td>
            <td className="py-3 px-4">
              <Button
                text={"Eliminar"}
                border={"1px solid #FD0053"}
                color={"black"}
                background={"white"}
                height={"40px"}
                width={"120px"}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UsersTable;
