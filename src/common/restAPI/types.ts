export type RestAPIDefaultErrors =
  | 'Forbidden'

export type RestAPIResponseMessage<Data = {}, ErrorMessage extends string = 'Unknown Error'> = {
  isSuccessful: true;
  data: Data;
} | {
  isSuccessful: false;
  errorMessage: ErrorMessage | RestAPIDefaultErrors;
}
