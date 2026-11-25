import type {GitHubRepo} from '../types';
export const endpoint='https://api.github.com/users/isidoraavs/repos?sort=updated&per_page=6';
export class HttpError extends Error {constructor(public status:number){super(status===404?'No se encontró el usuario o recurso.':'No fue posible obtener los repositorios.');}}
export async function getRepos(signal:AbortSignal):Promise<{status:number;data:GitHubRepo[]}>{
 const response=await fetch(endpoint,{signal});if(!response.ok)throw new HttpError(response.status);
 const payload:unknown=await response.json();
 if(!Array.isArray(payload))throw new Error('Respuesta inesperada');
 return {status:response.status,data:payload as GitHubRepo[]};
}
