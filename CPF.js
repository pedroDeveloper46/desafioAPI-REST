function isCpf(cpf) {
    const vetor1 = [10, 9, 8, 7, 6, 5, 4, 3, 2]
    const vetor2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]

    let digito1 = 0
    let digito2 = 0


    for (let index = 0; index < vetor1.length; index++) {
        digito1 = digito1 + (vetor1[index] * cpf.charAt(index))

    }

    let resto = digito1 % 11
    digito1 = 11 - resto

    if (resto >= 10) {
        digito1 = 0
    }

    for (let index = 0; index < vetor2.length; index++) {
        digito2 += (vetor2[index] * cpf.charAt(index))


    }

    let resto2 = digito2 % 11
    digito2 = 11 - resto2

    if (digito2 >= 10) {
        digito2 = 0
    }

    if (digito1 == cpf.substring(9, 10) && digito2 == cpf.substring(10, 11)) {
        return true
    } else {
        return false
    }

}

module.exports = { isCpf }