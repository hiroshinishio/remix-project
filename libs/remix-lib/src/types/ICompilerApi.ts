export interface ICompilerApi {
    currentFile: string
    compilationDetails: {
        contractMap: {
            file: string
        } | Record<string, any>,
        contractsDetails: Record<string, any>,
        target?: string
    }
    compileErrors: CompileErrors
    linterErrors: CompileError[]
    slitherErrors: CompileError[]
    compileTabLogic: any
    configurationSettings: ConfigurationSettings

    getCompilerParameters: () => ConfigurationSettings
    setCompilerParameters: (ConfigurationSettings?) => void

    getAppParameter: (value: string) => Promise<any>
    setAppParameter: (name: string, value: string | boolean) => void

    getFileManagerMode: () => string
    setCompilerConfig: (settings: any) => void

    getCompilationResult: () => any

    onCurrentFileChanged: (fileName: string) => void
    // onResetResults: () => void,
    onSetWorkspace: (isLocalhost: boolean, workspaceName: string) => void
    onFileRemoved: (path: string) => void
    onNoFileSelected: () => void
    onLintingFinished: () => void
    onSlitherFinished: () => void
    onCompilationFinished: (contractsDetails: any, contractMap: any) => void
    onSessionSwitched: () => void
    onContentChanged: () => void
    onFileClosed: (name: string) => void

    resolveContentAndSave: (url: string) => Promise<string>
    fileExists: (file: string) => Promise<boolean>
    writeFile: (file: string, content: string) => Promise<void>
    readFile: (file: string) => Promise<string>
    open: (file: string) => void
    saveCurrentFile: () => void
    runScriptAfterCompilation: (fileName: string) => void,
    runLinter: (fileName: string) => void,
    runSlither: () => void,

    logToTerminal: (log: terminalLog) => void

    compileWithHardhat: (configPath: string) => Promise<string>
    compileWithTruffle: (configPath: string) => Promise<string>
    statusChanged: (data: { key: string, title?: string, type?: string }) => void,
    emit?: (key: string, ...payload: any) => void
}

export type terminalLog = {
    type: 'info' | 'error' | 'warning' | 'log'
    value: string
}

export interface ConfigurationSettings {
    version: string,
    evmVersion: string,
    language: string,
    optimize: boolean,
    runs: string
}

export interface CompileError {
    mode?: string,
    severity?: string,
    formattedMessage?: string,
    type?: string
    column?: number,
    line?: number
    file?: string
  }
  
export interface CompileErrors {
    error: CompileError,
    errors: CompileError[]
}
