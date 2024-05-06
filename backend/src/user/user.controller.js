import { response, request } from "express";
import bcryptjs from "bcryptjs";
import Usuario from "./user.model.js";
import { generarJWT } from "../helpers/generar-jwt.js"

export const usuariosPost = async (req, res) => {
    const { nombre, username, correo, password } = req.body;
    const usuario = new Usuario({ nombre, usuario: username, correo, password });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(200).json({
        usuario
    });
}

export const usuariosLogin = async (req, res) => {
    const { user, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo: user });
        const usuario2 = await Usuario.findOne({ usuario: user });

        if (!usuario && !usuario2) {
            return res.status(400).json({
                msg: 'Usuario no encontrado'
            });
        }

        if ((!usuario || !usuario.estado) && (!usuario2 || !usuario2.estado)) {
            return res.status(400).json({
                msg: 'Usuario borrado de la base de datos'
            })
        }

        let passwordValido = false;
        if (usuario) {
            passwordValido = bcryptjs.compareSync(password, usuario.password);
        } else if (usuario2) {
            passwordValido = bcryptjs.compareSync(password, usuario2.password);
        }

        if (!passwordValido) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }

        const token = await generarJWT(usuario ? usuario.id : usuario2.id);

        res.status(200).json({
            msg_1: 'Inicio de sesión exitoso',
            msg_2: 'Bienvenido ' + (usuario ? usuario.nombre : usuario2.nombre),
            msg_3: 'Este su token => ' + token,
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }
}

export const getUserSetting = async (req, res) => {
    try{
        const { uid } = req.user

        const userData = await User.findById(uid)

        return res.status(200).json({
            id: userData.id,
            username: userData.usuario,
            nombre: userData.nombre,
            correo: userData.correo,
        })
    }catch(e){
        return res.status(500).send('Something went wrong')
    }
}

export const usuariosPut = async (req, res) => {
    const { id } = req.user;
    const { _id, password, correo, ...resto } = req.body;

    const usuarioso = await Usuario.findByIdAndUpdate(id, resto, { new: true });
    const nombre = usuarioso.nombre;
    const usua = usuarioso.usuario;

    res.status(200).json({
        msg: 'Tu usuario ha sido actualizado',
        nombre_nuevo: nombre,
        usuario_nuevo: usua
    });
}

export const passwordPatch = async (req, res) => {
    try{
        const { uid } = req.user
        const { password, newPassword} = req.body

        const userData = await User.findById(uid, {password: 1})

        const isPasswordCorrect = await bcryptjs.compare(password, userData.password)

        if(!isPasswordCorrect){
            return res.status(400).send('Invalid password. Please try again')
        }

        const encryptedPassword = await bcryptjs.hash(newPassword, 10)

        await User.updateOne({_id: uid},{password: encryptedPassword})

        return res.status(200).send('Password changed succesfully')
    }catch(e){
        return res.status(500).send('Somthing went wrong')
    } 
}