import {useState,useEffect} from 'react';import type {ApiState,GitHubRepo} from '../types';import {getRepos,HttpError} from '../services/apiService';
let cache:{status:number;data:GitHubRepo[]}|null=null;
export function useRepos(){const [state,setState]=useState<ApiState>(()=>cache?{kind:'success',...cache}:{kind:'loading'});const [attempt,setAttempt]=useState<number>(0);
useEffect(()=>{if(cache){setState({kind:'success',...cache});return;}const controller=new AbortController();setState({kind:'loading'});getRepos(controller.signal).then(result=>{if(!controller.signal.aborted){cache=result;setState({kind:'success',...result});}}).catch((error:unknown)=>{if(!controller.signal.aborted)setState({kind:'error',status:error instanceof HttpError?error.status:null,message:error instanceof Error?error.message:'Error de conexión'});});return()=>controller.abort();},[attempt]);
return {state,retry:()=>{cache=null;setAttempt(n=>n+1);}};}
