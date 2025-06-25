import { LocationStrategy } from '@angular/common';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Records {
  data: any;
  total: number;
}

/**
 * Classe abstrata que contém os métodos básicos e personalizáveis para realizar as operações CRUD
 * Aqui está toda a configuração para comunicação com a API
 * Basta estender a classe e implementar os métodos que deseja sobrescrever
 *
 */
export abstract class BaseApiService<T> {
  constructor(
    private httpClient: HttpClient,
    private locationStrategy: LocationStrategy,
    private endPoint: string,
  ) {}

  /**
   * Crud básico para POST e PUT
   *
   * @return um Observable do tipo T (instância da classe que estende a classe ResourceService)
   */
  postOrPut(
    body: any,
    id: any = -1,
    extraRoute: string = '',
    query: string = '',
  ): Observable<T> {
    if (id == -1)
      return this.httpClient
        .post<T>(
          this.apiUrl(`${this.endPoint}${extraRoute}`),
          this.cast(body),
          this.getOptions(),
        )
        .pipe(
          map((ret: any) => <T>this.mapObject(ret)),
          catchError(this.handleError),
        );
    else
      return this.httpClient
        .put<T>(
          this.apiUrl(`${this.endPoint}${extraRoute}/${id}${query}`),
          this.cast(body),
          this.getOptions(),
        )
        .pipe(
          map((ret: any) => <T>this.mapObject(ret)),
          catchError(this.handleError),
        );
  }

  /**
   * Crud básico para DELETE
   *
   * @return um Observable do tipo T (instância da classe que estende a classe ResourceService)
   */
  delete(id?: any): Observable<T> {
    return this.httpClient
      .delete<T>(this.apiUrl(`${this.endPoint}/${id}`), this.getOptions())
      .pipe(
        map((ret: any) => <T>this.mapObject(ret)),
        catchError(this.handleError),
      );
  }

  /**
   * Crud básico para GET by ID
   *
   * @return um Observable do tipo T (instância da classe que estende a classe ResourceService)
   */
  getOne(id: any, extraRoute: string = ''): Observable<T> {
    return this.httpClient
      .get<T>(
        this.apiUrl(`${this.endPoint}${extraRoute}/${id}`),
        this.getOptions(),
      )
      .pipe(
        map((ret: any) => <T>this.mapObject(ret)),
        catchError(this.handleError),
      );
  }

  /**
   * Crud básico para GET All
   *
   * @return um array de Observable do tipo T (instância da classe que estende a classe ResourceService)
   */
  getAll(params: any = {}, extraRoute: string = ''): Observable<Records> {
    return this.httpClient
      .get<
        T[]
      >(this.apiUrl(`${this.endPoint}${extraRoute}`), this.getOptions(params))
      .pipe(
        map((ret: any) => ({
          data: <T[]>this.mapArray(ret.data),
          total: ret.total,
        })),
        catchError(this.handleError),
      );
  }

  /**
   * GET genérico para retorno de qualquer tipo, caso precise de alguma URL diferente ou interface diferente
   *
   * @return um registro de Observable do any
   */
  get(params: any = {}, extraRoute: string = ''): Observable<any> {
    return this.httpClient
      .get<any>(
        this.apiUrl(`${this.endPoint}${extraRoute}`),
        this.getOptions(params),
      )
      .pipe(
        map((ret: any) => <any>this.mapObject(ret)),
        catchError(this.handleError),
      );
  }

  /**
   * Método para montar a URL da API
   *
   * @return a URL formatada
   */
  private apiUrl(path: string) {
    const url = [
      environment.apiUrl || location.origin,
      this.locationStrategy.getBaseHref(),
    ];

    return [...url, path.replace(/\/?\bapi\b/, '')]
      .filter((item) => !!item)
      .map((item) => item.replace(/^\//, ''))
      .map((item) => item.replace(/\/$/, ''))
      .filter((item) => !!item)
      .join('/');
  }

  /**
   * Método para pegar o token do localStorage
   *
   * @return o token
   */
  private get jwtToken() {
    return localStorage['jwtToken'];
  }

  /**
   * Método para montar as opções de requisição incluindo o Header
   *
   * @return um objeto com as opções
   */
  private getOptions(params = {}) {
    let headers: any = { 'Content-Type': 'application/json' };

    const context = sessionStorage['context'];

    if (context) headers = { ...headers, context };

    if (this.jwtToken)
      headers = { ...headers, Authorization: `Bearer ${this.jwtToken}` };

    return {
      headers: new HttpHeaders(headers),
      params,
    };
  }

  /**
   * Método para tratamento de erros
   *
   * @return um objeto do tipo Error com mensagem padrão da API
   */
  private handleError(e: HttpErrorResponse) {
    let severity: string;
    let detail: string;

    if (e.status === 0) {
      severity = 'error';
      detail =
        'Falha de conexão!<p>Verifique sua internet e tente novamente.</p>';
    } else if (e.error) {
      severity = e.error.severity;
      detail = e.error.detail;
    } else {
      severity = 'error';
      detail = e.status + ' - ' + e.message;
    }

    return throwError(() => {
      const error: any = new Error(e.message);

      error.severity = severity;
      error.detail = detail;

      return error;
    });
  }

  /**
   * Método para mapeamento de objeto
   * Pode ser sobrescrito para mapear o objeto de acordo com a necessidade
   *
   * @return um objeto mapeado
   */
  protected mapObject(item: any): T {
    return item as T;
  }

  /**
   * Método para mapeamento de lista de objetos
   * Pode ser sobrescrito para mapear uma lista de objetos de acordo com a necessidade
   *
   * @return uma lista de objetos mapeados
   */
  protected mapArray(items: any[]): T[] {
    return items as T[];
  }

  /**
   *
   * @param formBuilderObj Função para mapear o objeto do formBuilder para um objeto com campos vazios para nulos
   * @returns um objeto com os campos ajustados
   */
  private cast<T extends Record<string, any>>(formBuilderObj: T): T {
    const result: Record<string, any> = {};

    for (const key in formBuilderObj) {
      if (Object.prototype.hasOwnProperty.call(formBuilderObj, key)) {
        result[key] = formBuilderObj[key] !== '' ? formBuilderObj[key] : null;
      }
    }

    return result as T;
  }
}
