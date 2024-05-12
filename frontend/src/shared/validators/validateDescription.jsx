export const validateDescription = (description) => {
    return description.length >= 10 && description.length <= 1000
}

export const descriptionValidateMessage = 'La descripcion debe tener entre 10 y 1000 caracteres'