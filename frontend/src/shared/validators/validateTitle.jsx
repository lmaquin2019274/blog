export const validateTitle = (title) => {
    return title.length >=2 && title.length <=30
}

export const validateTitleMessage = 'El titulo debe tener entre 2 y 30 caracteres'