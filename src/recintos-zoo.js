class RecintosZoo {
    constructor() {
        // Definindo os recintos do zoológico
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: ['macaco'], espacoUsado: 3 },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [], espacoUsado: 0 },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: ['gazela'], espacoUsado: 2 },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [], espacoUsado: 0 },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: ['leao'], espacoUsado: 3 }
        ];

        // Definindo os animais e suas características
        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };
    }

    // Função principal para analisar os recintos
    analisaRecintos(animal, quantidade) {
        // Validação do animal
        if (!this.animais[animal]) {
            return { erro: 'Animal inválido' };
        }

        // Validação da quantidade
        if (quantidade <= 0) {
            return { erro: 'Quantidade inválida' };
        }

        // Pegando as características do animal
        const caracteristicasAnimal = this.animais[animal];

        // Variável para armazenar os recintos viáveis
        let recintosViaveis = [];

        // Loop através de todos os recintos
        this.recintos.forEach(recinto => {
            console.log(`Espécie: ${animal.toLowerCase()}`);
            console.log(`Verificando recinto número: ${recinto.numero}`); // Adicionado para depuração
            // Verificar se o bioma do recinto é adequado
            if (!caracteristicasAnimal.biomas.includes(recinto.bioma)) {
                if (recinto.bioma === 'savana e rio') {
                    if (!caracteristicasAnimal.biomas.includes('savana') && !caracteristicasAnimal.biomas.includes('rio')) {
                        console.log(`Bioma do recinto ${recinto.numero} não é compatível`); // Adicionado para depuração
                        return;
                    }
                }
                else {
                    return;
                }
            }

            // Verificar se o animal é carnívoro e se os animais no recinto são da mesma espécie
            if (caracteristicasAnimal.carnivoro) {
                if (recinto.animais.some(esp => esp !== animal.toLowerCase())) {
                    return; // Carnívoros só podem ficar com animais da mesma espécie
                }
            }

            // Verificar se há carnívoros no recinto e se o animal é da mesma espécie
            if (this._temCarnivoro(recinto) && recinto.animais[0] !== animal.toLowerCase()) {
                console.log(`Recinto ${recinto.numero} tem carnívoros e não é compatível com ${animal}`); // Adicionado para depuração
                return; // Carnívoros só podem estar com a própria espécie
            }

            if (animal.toLowerCase() === 'hipopotamo') {
                // Se ele tiver sozinho, suporta.
                // se houver especie diferente de hipopotamo no recinto, e o recinto nao for savana e rio, quebrou a regra.
                // Retorna sim se existe alguma especie diferente de HIPOPOTAMO no recinto
                if (recinto.animais.some(esp => esp !== animal.toLowerCase())) {
                    if (recinto.bioma !== 'savana e rio') {
                        console.log(`Recinto ${recinto.numero} tem outra espécie e não é savana e rio`); // Adicionado para depuração
                        return; // Quebra a regra, portanto não é um recinto viável
                    }
                }
            }

            // Verificar se há espaço suficiente no recinto
            let espacoNecessario = (caracteristicasAnimal.tamanho * quantidade);
            if (recinto.animais.some(esp => esp !== animal.toLowerCase())) {
                espacoNecessario++;
            }
            const espacoDisponivel = recinto.tamanhoTotal - recinto.espacoUsado;

            if (espacoNecessario > espacoDisponivel) {
                console.log(`Espaço insuficiente no recinto ${recinto.numero}`); // Adicionado para depuração
                console.log(`Espaço necessário: ${espacoNecessario}`);
                console.log(`Espaço disponível: ${espacoDisponivel}`);
                return; // Não há espaço suficiente
            }
            recinto.espacoUsado += espacoNecessario;

            // Um macaco não se sente confortável sem outro animal no recinto, seja da mesma ou outra espécie
            if (animal.toLowerCase() === 'macaco' && recinto.espacoUsado <= 1) {
                console.log(`Recinto ${recinto.numero} não é adequado para macacos`); // Adicionado para depuração
                return; // Quebrou a regra.
            }

            // Caso o recinto seja viável, adicionamos à lista 
            recintosViaveis.push(
                `Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacoNecessario} total: ${recinto.tamanhoTotal})`
            );

        });

        // Se nenhum recinto for viável, retornar o erro apropriado
        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        // Retornar a lista de recintos viáveis
        return { recintosViaveis };
    }


    // Função auxiliar para verificar se há carnívoros no recinto
    _temCarnivoro(recinto) {
        return recinto.animais.some(animal => this.animais[animal.toUpperCase()].carnivoro);
    }
}

export { RecintosZoo as RecintosZoo };
