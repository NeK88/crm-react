import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarCLiente } from "../data/clientes";

export async function action({ request }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const email = formData.get("email");

  //validacion
  const errores = [];
  if (Object.values(datos).includes("")) {
    errores.push("Todos los campos son obligatorios");
  }

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
    errores.push("El email no es válido");
  }

  //Retornar datos sí hay errores
  if (Object.keys(errores).length) {
    return errores;
  }
  await agregarCLiente(datos);
  return redirect("/");

  //Este return es completamente necesario en las nuevas versiones de react para la funcion useActionData siempre tiene que retonar algo
  // return { ok: true };
}

function NuevoCliente() {
  const errores = useActionData();
  const navigate = useNavigate();

  console.log(errores);
  return (
    <>
      <h1 className="text-4xl font-black text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">
        Llena todos los campos para registrar un nuevo cliente
      </p>

      <div className="flex justify-end">
        <button
          className="px-3 py-1 font-bold text-white uppercase bg-blue-800"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
      <div className="px-5 py-10 mx-auto mt-20 bg-white rounded-md shadow md:w-3/4">
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form method="post" noValidate>
          <Formulario />

          <input
            type="submit"
            className="w-full p-3 mt-5 text-lg font-bold text-white uppercase bg-blue-800"
            value="Registrar Cliente"
          />
        </Form>
      </div>
    </>
  );
}

export default NuevoCliente;
