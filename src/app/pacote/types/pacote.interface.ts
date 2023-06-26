import { ClienteInterface } from '../../cliente/types/cliente.interface';
import { PassagemInterface } from '../../passagem/types/passagem.interface';



export interface PacoteInterface {
    id: string
    cliente: ClienteInterface
    passagem: PassagemInterface
    roteiro: string
    agente: string
    valor: number

}

