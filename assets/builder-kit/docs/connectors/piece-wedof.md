# Wedof

Automatisez la gestion de vos dossiers de formations (CPF, EDOF, Kairos, AIF, OPCO et autres)

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-wedof'
  version: '1.4.8'
```

Categories: SALES_AND_CRM, CONTENT_AND_FILES, PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Clé API

> Veuillez saisir votre clé API fournie par wedof

## Actions

### `listPartnerStats`

**Lister les statistiques des partenaires.** Retrieves statistics for the partners of a given certification (identified by certifInfo), filterable by partnership state, sync state, compliance, and connection issues, with paging and sort order. Read-only and safe to repeat. Use to report on or analyze certification partners rather than to modify them. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `certifInfo` | string | yes |  | Identifiant de certification. |
| `certifierAccessState` | string | no | `"all"` | État de synchronisation du partenariat. One of `"waiting"`, `"accepted"`, `"refused"`, `"terminated"`, `"none"`, `"all"`. |
| `compliance` | string | no | `"all"` | État de conformité. One of `"all"`, `"none"`, `"compliant"`, `"partiallyCompliant"`, `"nonCompliant"`, `"inProgress"`. |
| `connectionIssue` | string | no |  | Présence de problème de connexion. One of `"true"`, `"false"`. |
| `format` | string | no | `"json"` | Format de la réponse. One of `"json"`, `"csv"`. |
| `limit` | number | no | `100` | Nombre de résultats. |
| `order` | string | no | `"desc"` | Ordre de tri. One of `"asc"`, `"desc"`. |
| `page` | number | no | `1` | Numéro de page. |
| `sort` | string | no | `"stateLastUpdate"` | Trier par. One of `"stateLastUpdate"`, `"name"`, `"state"`. |
| `state` | string | no | `"all"` | État du partenariat. One of `"all"`, `"draft"`, `"processing"`, `"active\t"`, `"aborted"`, `"refused"`, `"revoked"`, `"suspended"`. |

### `getRegistrationFolder`

**Récupérer un dossier de formation.** Retrieves a single training registration folder by its folder number (externalId). Read-only and safe to repeat. Use when you already know the folder number; to find folders by criteria use the search-folders action instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de formation. Sélectionner la propriété {externalId} du dossier de formation. |

### `listRegistrationFolders`

**Rechercher un ou plusieurs dossiers de formation.** Searches and lists training registration folders across the organization, filtered by free-text query, period, type, lifecycle/billing/control state, certification, tags, and many other criteria, with paging and sorting. Read-only and safe to repeat. Use to find folders matching conditions; to fetch one known folder by its number use the get-folder action instead. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Recherche. Nom, prénom, N° de dossier, N° de certification etc.. |
| `period` | string | no | `null` | Période. One of `"custom"`, `"tomorrow"`, `"today"`, `"yesterday"`, `"rollingWeek"`, `"rollingWeekFuture"`, `"nextWeek"`, `"previousWeek"`, `"currentWeek"`, `"rollingMonth"`, `"rollingMonthFuture"`, `"nextMonth"`, `"previousMonth"`, `"currentMonth"`, `"rollingYear"`, `"rollingYearFuture"`, `"nextYear"`, `"previousYear"`, `"currentYear"`, `"wedofInvoice"`. |
| `periodForm` | object | yes |  | ez. An object whose fields depend on other inputs; the product shows them. |
| `type` | array | no |  | Financement. One of `"all"`, `"cpf"`, `"kairosAif"`, `"opco"`, `"company"`, `"individual"`, `"poleEmploi"`. |
| `state` | array | no |  | Etat du dossier de formation. One of `"notProcessed"`, `"validated"`, `"waitingAcceptation"`, `"accepted"`, `"inTraining"`, `"terminated"`, `"serviceDoneDeclared"`, `"serviceDoneValidated"`, `"canceledByAttendee"`, `"canceledByAttendeeNotRealized"`, `"canceledByOrganism"`, `"canceledByFinancer"`, `"rejectedWithoutTitulaireSuite"`, `"refusedByAttendee"`, `"refusedByOrganism"`, `"refusedByFinancer"`. |
| `billingState` | array | no |  | État de facturation. One of `"all"`, `"notBillable"`, `"depositWait"`, `"depositPaid"`, `"toBill"`, `"billed"`, `"paid"`. |
| `controlState` | array | no |  | Etat de controle. Permet de n'obtenir que les dossiers dans l'état de contrôle considéré. One of `"notInControl"`, `"inControl"`, `"released"`. |
| `certificationFolderState` | array | no |  | État du dossier de certification. One of `"all"`, `"toRegister"`, `"registered"`, `"toTake"`, `"toControl"`, `"success"`, `"toRetake"`, `"failed"`, `"refused"`, `"aborted"`, `"toRegister"`. |
| `proposalCode` | string | no |  | Code de proposition commercial. Code de la proposition commercial Wedof associé. |
| `siret` | string | no |  | Siret. Permet de n'obtenir que les dossiers appartenant à l'organisme de siret considéré - par défaut l'organisme de l'utilisateur courant. |
| `certifInfo` | string | no |  | Certification. Filtrer par certification. |
| `columnId` | string | no |  | ID de colonne. Identifiant pour affichage personnalisé. |
| `completionRate` | string | no |  | Taux d’assiduité. Permet de n'obtenir que les dossiers dont le taux d'assiduité choisi. One of `"0"`, `"25<"`, `"25<>80"`, `">80"`, `"100"`. |
| `daysSinceLastUpdatedCompletionRate` | string | no |  | Jours sans mise à jour d'assiduité. Permet de n'obtenir que les dossiers pour lesquels le taux d'avancement n'a pas été mis à jour depuis plus de X jours. |
| `format` | string | no | `"json"` | Format de sortie. One of `"json"`, `"csv"`. |
| `messageState` | string | no |  | État du message. Permet de n'obtenir que les dossiers liés à l'état d'envoi d'un message considéré - par défaut tous les dossiers sont retournés. One of `"sent"`, `"notSent"`, `"notSentUnauthorized"`, `"notSentEnforcedConditions"`, `"failed"`, `"scheduled"`. |
| `messageTemplate` | string | no |  | Modèle de message. Permet de n'obtenir que les dossiers pour lequels un message issue du modèle considéré a été créé - par défaut aucun filtre. |
| `order` | string | no |  | Ordre de tri. One of `"asc"`, `"desc"`. |
| `organismType` | string | no |  | Type d’organisme. One of `"self"`, `"partners"`. |
| `sort` | string | no |  | Critère de tri. Tri les résultats sur un critère. One of `"firstName"`, `"lastName"`, `"lastUpdate"`, `"id"`. |
| `tags` | array | no |  | Tags. Recherche libre sur les tags. |
| `trainingActionId` | string | no |  | ID de l'action de formation. Permet de n'obtenir que les dossiers liés à l'action de formation considérée. |
| `trainingId` | string | no |  | ID de la formation. Permet de n'obtenir que les dossiers liés à la formation considérée. |
| `sessionId` | string | no |  | ID de la session. Permet de n'obtenir que les dossiers liés à la session considérée. |
| `limit` | number | no | `100` | Nombre de dossiers de formation. Nombre de dossiers de formation maximum qui seront retournés par requête. |
| `page` | number | no | `1` | N° de page de la requête. Par défaut : 1. |

### `updateRegistrationFolder`

**Mettre à jour un dossier de formation.** Updates editable fields on a single training registration folder (price, session start/end dates, notes, public description, completion rate, durations, tags); only the fields explicitly selected are sent. Idempotent: re-sending the same values leaves the folder unchanged. Note that tags are replaced wholesale, so include any existing tags you wish to keep. For changing only the completion rate, the dedicated update-completion-rate action is also available. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de formation. Sélectionner la propriété {externalId} du dossier de formation. |
| `fieldsToUpdate` | array | yes |  | Champs à mettre à jour. Sélectionner les champs que vous souhaitez mettre à jour. One of `"price"`, `"sessionStartDate"`, `"sessionEndDate"`, `"notes"`, `"description"`, `"completionRate"`, `"indicativeDuration"`, `"weeklyDuration"`, `"tags"`. |
| `dynamicFields` | object | no |  | Champs sélectionnés. An object whose fields depend on other inputs; the product shows them. |

### `validateRegistrationFolder`

**Valider le dossier de formation.** Transitions a training registration folder into the 'validated' state, optionally supplying total training duration and weekly intensity. Not idempotent: it advances the folder's lifecycle and should be called once. The duration field is mandatory for France Travail (Pôle Emploi) funded folders. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de formation. Sélectionner la propriété {externalId} du dossier de formation. |
| `indicativeDuration` | number | no |  | Durée totale de la formation. Obligatoire dans le cas d'un dossier de formation avec financement France Travail. |
| `weeklyDuration` | number | no |  | Intensité hebdomadaire. Intensité hebdomadaire de la formation, en heures par semaine. |

### `declareRegistrationFolderTerminated`

**Passer un dossier de formation à l'état : sortie de formation.** Transitions a training registration folder into the 'terminated' (exited training) state, recording an exit date, a required exit reason code, and any absence duration. Not idempotent: it advances the folder's lifecycle and should be called once when training ends. To then declare the service done, use the service-done action instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de formation. Sélectionner la propriété {externalId} du dossier de formation. |
| `date` | ISO date-time string | no | `"2026-11-05"` | Sortie de formation le. Date au format YYYY-MM-DD. |
| `code` | string | yes |  | Raison de la sortie de formation. Sélectionner la raison de sortie de formation. A value the product loads from the provider, such as an id; write the value itself. |
| `absenceDuration` | number | no | `0` | durée d'absence. La durée d'une éventuelle absence en heures. 0 si aucune absence. |

### `declareRegistrationFolderServicedone`

**Passer un dossier de formation à l'état : Service fait déclaré.** Transitions a training registration folder into the 'service done declared' state, recording exit reason, exit date, and absence details. Works from either the 'in training' or 'terminated' state; from 'in training' it auto-passes through 'terminated' first. Not idempotent: it advances the folder's lifecycle and should be called once after training is complete. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de formation. Sélectionner la propriété {externalId} du dossier de formation. |
| `absenceDuration` | number | no | `0` | durée d'absence. La durée d'une éventuelle absence en heures. 0 si aucune absence. |
| `forceMajeureAbsence` | string | no | `false` | Absence pour raison de force majeure. Si absence pour raison de force majeure, 'Oui', sinon 'Non'. One of `true`, `false`. |
| `trainingDuration` | number | no | `0` | Durée totale de la formation. Précise la durée totale de la formation afin de calculer le % d'absence. Si rien n'est précisé, récupère la durée dans le trainingActionInfo/duration. |
| `code` | string | yes |  | Raison de la sortie de formation. Sélectionner la raison de sortie de formation. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | ISO date-time string | no | `"2026-11-05"` | Sortie de formation le. Date du sortie de formation au format YYYY-MM-DD. Par défaut, date du jour. Si la date a déjà été indiquée au moment du terminate, il n'est pas nécessaire de la repréciser. |

### `declareRegistrationFolderIntraining`

**Passer un dossier de formation à l'état : En formation.** Transitions a training registration folder into the 'in training' state, optionally recording the training start date. Not idempotent: it advances the folder's lifecycle and should be called once when training begins. Use the terminated and service-done actions for later lifecycle steps. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de formation. Sélectionner la propriété {externalId} du dossier de formation. |
| `date` | ISO date-time string | no |  | Entrée en formation le. Date au format YYYY-MM-DD. |

### `billRegistrationFolder`

**Facturer le dossier de formation.** Associates an invoice number with a training registration folder and transmits the billing details to the funder (e.g. EDOF), optionally forcing a VAT rate. Not idempotent: it triggers a billing transmission and should be called once per folder. VAT is computed from the folder unless explicitly overridden. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de formation. Sélectionner la propriété {externalId} du dossier de formation. |
| `billNumber` | string | yes |  | N° de facture. N° de la facture à associer. |
| `vatRate` | number | no |  | TVA. Permet de forcer un Taux de TVA en %. Par défaut la TVA est calculée à partir des données du dossier de formation. |

### `cancelRegistrationFolder`

**Annuler le dossier de formation.** Cancels a training registration folder, recording a required cancellation reason code and an optional explanatory note. Not idempotent: it advances the folder's lifecycle to a canceled state and should be called once. Distinct from refusing a folder, which uses a separate action and reason set. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de formation. Sélectionner la propriété {externalId} du dossier de formation. |
| `code` | string | yes |  | Raison de l'annulation du dossier de formation. Sélectionner la raison de l'annulation. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. Texte expliquant les raisons de l'annulation. |

### `refuseRegistrationFolder`

**Refuser le dossier de formation.** Refuses a training registration folder, recording a required refusal reason code and an optional explanatory note. Not idempotent: it advances the folder's lifecycle to a refused state and should be called once. Distinct from canceling a folder, which uses a separate action and reason set. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de formation. Sélectionner la propriété {externalId} du dossier de formation. |
| `code` | string | yes |  | Raison du refus du dossier de formation. Sélectionner la raison du refus. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. Texte expliquant les raisons du refus. |

### `getMinimalSessionsDates`

**Date minimale de début de session de formation.** Retrieves the earliest allowed training-session start dates for registration folders. Read-only, takes no input, and safe to call repeatedly. Use to determine the minimum valid start date before creating or scheduling a session. Needs authentication.

Kind: read, safe to repeat.

No inputs.

### `getRegistrationFolderDocuments`

**Liste des documents d'un dossier de formation.** Lists all documents/files attached to a single Wedof training registration folder, identified by its folder ID. Read-only and safe to repeat. Use to enumerate the documents on one specific folder; this is not a folder search and does not return document contents. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `Id` | string | yes |  | N° du dossier de formation. Sélectionner la propriété {Id} du dossier de formation. |

### `updateCompletionRate`

**Mettre à jour l'assiduité d'un apprenant.** Sets a learner's attendance/progress completion rate (an integer 0-100 percent) on a single training registration folder. Idempotent: it overwrites the stored rate, so repeating with the same value is safe. Only valid while the folder is in the 'in training' or 'terminated' state. Use this when only the completion rate needs changing; use the general update-folder action for multiple fields. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de formation. Sélectionner la propriété {externalId} du dossier de formation. |
| `completionRate` | number | yes |  | Taux d'avancement. Taux d'avancement en % compris entre 0% et 100%. Uniquement sous format d'un entier. Uniquement possible à l'état En formation et Sortie de formation. |

### `createRegistrationFolder`

**Créer un dossier de formation hors CPF.** Creates a new non-CPF training registration folder for a given session and learner, with a price and funding type (individual, OPCO, Pôle Emploi, or company). Not idempotent: each call creates a separate folder. The Pôle Emploi fields are required only when the funding type is poleEmploi. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sessionId` | number | yes |  | ID de session. ID technique de la session choisie (pas l'externalId) |
| `attendeeId` | number | yes |  | L'ID de l'apprenant. ID de l'apprenant sélectionné. |
| `totalTTC` | number | yes |  | Le prix de la formation TTC. |
| `type` | string | yes |  | Type de financement. Type de financement du dossier créer. One of `"individual"`, `"opco"`, `"poleEmploi"`, `"company"`. |
| `poleEmploiId` | string | no |  | L'ID Pole Emploi de l'apprenant. UNIQUEMENT requis si le type du dossier est poleEmploi. |
| `poleEmploiRegionCode` | string | no |  | Le département de l'apprenant. UNIQUEMENT requis si le type du dossier est poleEmploi. One of `"024"`, `"034"`, `"017"`, `"001"`, `"044"`, `"040"`, `"050"`, `"027"`, `"035"`, `"051"`, `"065"`, `"032"`, `"061"`, `"020"`, `"066"`, `"069"`, `"041"`, `"068"`, `"046"`, `"012"`, `"063"`, `"067"`, `"071"`, `"048"`, `"057"` and 9 more. |
| `poleEmploiDevis` | string | no |  | Le numéro de devis Pole Emploi de l'apprenant. UNIQUEMENT requis si le type du dossier est poleEmploi. |
| `inPartnershipWith` | string | no |  | SIRET du partenaire. |

### `getCertificationFolder`

**Récupérer un dossier de certification.** Retrieve a single Wedof certification folder by its externalId. Pick this when you already know the folder number and need its full details; use search-certification-folder to find folders by criteria. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de certification. Sélectionner la propriété {externalId} du dossier de certification. |

### `searchCertificationFolder`

**Rechercher un ou plusieurs dossiers de certifications.** Search and list Wedof certification folders matching filters such as free-text query, folder/training state, period, funding type, SIRET, tags, CDC accrochage status, and survey status, with sorting, pagination, and JSON or CSV output. Pick this to discover folders or find a folder id; it is read-only and idempotent. Use the get-certification-folder action when you already have a single folder externalId. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Recherche. Permet d'effectuer une recherche libre sur les champs nom du candidat, prénom du candidat, email du candidat, tags, commentaire, id du dossier de certification et phoneNumber. |
| `period` | string | no | `null` | Période. One of `"custom"`, `"tomorrow"`, `"today"`, `"yesterday"`, `"rollingWeek"`, `"rollingWeekFuture"`, `"nextWeek"`, `"previousWeek"`, `"currentWeek"`, `"rollingMonth"`, `"rollingMonthFuture"`, `"nextMonth"`, `"previousMonth"`, `"currentMonth"`, `"rollingYear"`, `"rollingYearFuture"`, `"nextYear"`, `"previousYear"`, `"currentYear"`, `"wedofInvoice"`. |
| `periodForm` | object | yes |  | ez. An object whose fields depend on other inputs; the product shows them. |
| `state` | array | no |  | Etat du dossier de certification. Permet de n'obtenir que les dossiers dans l'état d'obtention de la certification considéré. Plusieurs états peuvent être sélectionnés. One of `"all"`, `"toRegister"`, `"refused"`, `"registered"`, `"toTake"`, `"toControl"`, `"toRetake"`, `"failed"`, `"aborted"`, `"success"`. |
| `registrationFolderState` | array | no |  | État du dossier de formation. Permet de n'obtenir que les dossiers dans l'état considéré. Plusieurs états peuvent être sélectionnés. One of `"notProcessed"`, `"validated"`, `"waitingAcceptation"`, `"rejectedWithoutTitulaireSuite"`, `"rejected"`, `"rejectedWithoutCdcSuite"`, `"accepted"`, `"inTraining"`, `"terminated"`, `"serviceDoneDeclared"`, `"serviceDoneValidated"`, `"canceledByAttendee"`, `"canceledByAttendeeNotRealized"`, `"canceledByOrganism"`, `"refusedByAttendee"`, `"refusedByOrganism"`. |
| `sort` | string | no |  | Tri sur critère. Trie les résultats sur un critère. One of `"stateLastUpdate"`, `"id"`, `"successDate"`. |
| `order` | string | no |  | Ordre. Tri les résultats par ordre ascendant ou descendant. One of `"asc"`, `"desc"`. |
| `cdcState` | string | no |  | État CDC. Permet de n'obtenir que les dossiers dans l'état considéré lié à l'export des dossiers. One of `"all"`, `"notExported"`, `"exported"`, `"processedOk"`, `"processedKo"`. |
| `cdcExcluded` | string | no |  | Exclus de l'accrochage. Permet de filtrer les dossiers de certification qui sont exclus de l'accrochage. One of `true`, `false`. |
| `cdcCompliant` | string | no |  | Données apprenant complètes. Permet de filtrer les dossiers de certification selon le fait qu'ils contiennent les données de l'apprenant obligatoires pour l'accrochage en cas d'obtention de la certification. One of `true`, `false`. |
| `cdcToExport` | string | no |  | Inclus dans les prochains accrochages. Permet de filtrer les dossiers de certification qui devront être inclus dans les prochains exports pour l'accrochage. One of `true`, `false`. |
| `certifInfo` | array | no |  | ID certification. Permet de n'obtenir que les dossiers liés à la certification considérée. |
| `dataProvider` | array | no |  | Type de financement. Permet de n'obtenir que les dossiers dans le type considéré. Plusieurs types peuvent être sélectionnés. One of `"cpf"`, `"individual"`, `"poleEmploi"`, `"company"`, `"opco"`, `"opcoCfa"`, `"kairosAif"`, `"none"`. |
| `siret` | array | no | `["all"]` | SIRET. Permet de n'obtenir que les dossiers issus de l'organisme de formation de siret considéré. Utilisez "all" pour récupérer tous les dossiers de tous les organismes. |
| `tags` | array | no |  | Tags. Recherche libre sur les tags. |
| `format` | string | no | `"json"` | Format de sortie. Permet d'obtenir une liste des dossiers de certification au format json ou csv. One of `"json"`, `"csv"`. |
| `limit` | number | no | `100` | Limite. Nombre de dossiers de certification. |
| `page` | number | no | `1` | Page. Numéro de page de la requête. |
| `cdcFile` | string | no |  | Fichier CDC. Permet de filtrer les dossiers de certification exportés sur un fichier XML lié à l'accrochage. |
| `certificatePrintData` | string | no |  | Données d'impression de certificat. Permet de n'obtenir que les dossiers pour lesquels un parchemin est en cours d'impression ou a été imprimé. One of `true`, `false`. |
| `columnId` | string | no |  | ID de colonne. Identifiant pour affichage personnalisé. |
| `registrationFolderCompletionRate` | string | no |  | Taux d'avancement. Permet de n'obtenir que les dossiers dont le taux d'avancement choisi. One of `">80"`, `"<80"`. |
| `skillSets` | string | no |  | Blocs de compétences. Permet de n'obtenir que les dossiers liés à une certification RNCP pour les blocs de compétences considérés. |
| `survey` | string | no |  | Questionnaire de suivi d'insertion professionnelle. Permet de n'obtenir que les dossiers pour lesquels un questionnaire doit être répondu ou a été répondu. One of `"initialExperienceStartDate"`, `"sixMonthExperienceStartDate"`, `"longTermExperienceStartDate"`, `"initialExperienceAnsweredDate"`, `"sixMonthExperienceAnsweredDate"`, `"longTermExperienceAnsweredDate"`. |
| `metadata` | array | no |  | Données personnalisées. tableau associatif clé - valeur, disponible uniquement pour le certificateur. |
| `messageState` | string | no |  | État du message. Permet de n'obtenir que les dossiers liés à l'état d'envoi d'un message considéré. One of `"sent"`, `"notSent"`, `"notSentUnauthorized"`, `"notSentEnforcedConditions"`, `"failed"`, `"scheduled"`. |
| `messageTemplate` | string | no |  | Modèle de message. Permet de n'obtenir que les dossiers pour lequels un message issue du modèle considéré a été créé - par défaut aucun filtre. |

### `declareCertificationFolderRegistred`

**Passer un dossier de certification à l'état : Enregistré.** Transition a Wedof certification folder into the 'registered' state, optionally recording enrollment/exam dates, exam type and place, and a comment. Pick this to confirm the candidate is enrolled for the certification, typically before 'toTake'; it follows the certification-folder state machine and is not idempotent. Requires the folder's externalId. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de certification. Sélectionner la propriété {externalId} du dossier de certification. |
| `enrollmentDate` | ISO date-time string | no |  | Date d'inscription à la certification. Date au format YYYY-MM-DD. |
| `examinationDate` | ISO date-time string | no |  | Date de passage de l'examen. Date au format YYYY-MM-DD. |
| `examinationEndDate` | ISO date-time string | no |  | Date de fin de passage de l'examen. Date au format YYYY-MM-DD. |
| `examinationType` | string | no | `null` | Type de passage de l'examen. One of `"A_DISTANCE"`, `"EN_PRESENTIEL"`, `"MIXTE"`. |
| `examinationPlace` | string | no |  | Lieu de passage de l'examen. |
| `comment` | string | no |  | Commentaire. |

### `declareCertificationFolderToTake`

**Passer un dossier de certification à l'état : Prêt à passer.** Transition a Wedof certification folder into the 'toTake' (ready-to-take) state, optionally recording enrollment/exam dates, exam type and place, and a third-time accommodation flag. Pick this when the candidate is cleared to sit the exam; it follows the certification-folder state machine (typically after 'registered') and is not idempotent — re-running re-posts the transition. Requires the folder's externalId. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de certification. Sélectionner la propriété {externalId} du dossier de certification. |
| `enrollmentDate` | ISO date-time string | no |  | Date d'inscription à la certification. Date au format YYYY-MM-DD. |
| `examinationDate` | ISO date-time string | no |  | Date de passage de l'examen. Date au format YYYY-MM-DD. |
| `examinationEndDate` | ISO date-time string | no |  | Date de fin de passage de l'examen. Date au format YYYY-MM-DD. |
| `examinationType` | string | no | `null` | Type de passage de l'examen. One of `"A_DISTANCE"`, `"EN_PRESENTIEL"`, `"MIXTE"`. |
| `examinationPlace` | string | no |  | Lieu de passage de l'examen. |
| `tiersTemps` | string | yes |  | Tiers temps. Indique si le candidat a besoin d'un tiers temps. One of `false`, `true`. |
| `comment` | string | no |  | Commentaire. |

### `declareCertificationFolderToControl`

**Passer un dossier de certification à l'état : À contrôler.** Transition a Wedof certification folder into the 'toControl' (to-be-reviewed) state, requiring the exam date and exam type plus optional enrollment/end dates, place, and comment. Pick this when the exam has been taken and the folder awaits review before a success/failure decision. Follows the certification-folder state machine and is not idempotent. Requires the folder's externalId. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de certification. Sélectionner la propriété {externalId} du dossier de certification. |
| `enrollmentDate` | ISO date-time string | no |  | Date d'inscription à la certification. Date au format YYYY-MM-DD. |
| `examinationDate` | ISO date-time string | yes |  | Date de passage de l'examen. Date au format YYYY-MM-DD. |
| `examinationEndDate` | ISO date-time string | no |  | Date de fin de passage de l'examen. Date au format YYYY-MM-DD. |
| `examinationType` | string | yes | `{"value":"A_DISTANCE","label":"À distance"}` | Type de passage de l'examen. One of `"A_DISTANCE"`, `"EN_PRESENTIEL"`, `"MIXTE"`. |
| `examinationPlace` | string | no |  | Lieu de passage de l'examen. |
| `comment` | string | no |  | Commentaire. |

### `declareCertificationFolderSuccess`

**Passer un dossier de certification à l'état : Réussi.** Transition a Wedof certification folder into the 'success' (passed) state, recording the required issue date plus optional detailed result, European language level, digital-proof link, and grade. Pick this when the candidate has obtained the certification; use the 'failed' or 'toRetake' actions for other outcomes. Follows the certification-folder state machine and is not idempotent. Requires the folder's externalId. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de certification. Sélectionner la propriété {externalId} du dossier de certification. |
| `detailedResult` | string | no |  | Détail du résultat de l'examen. |
| `europeanLanguageLevel` | string | no | `null` | Nomenclature européeenne pour les certifications de langues. One of `"C2"`, `"C1"`, `"B2"`, `"B1"`, `"A2"`, `"A1"`, `"INSUFFISANT"`. |
| `issueDate` | ISO date-time string | yes |  | Date d'obtention de la certification. Date au format YYYY-MM-DD. |
| `digitalProofLink` | string | no |  | Lien vers la preuve numérique de l'obtention de la certification. |
| `gradePass` | string | no | `null` | Ajoute une mention au dossier de certification. One of `"SANS_MENTION"`, `"MENTION_ASSEZ_BIEN"`, `"MENTION_BIEN"`, `"MENTION_TRES_BIEN"`, `"MENTION_TRES_BIEN_AVEC_FELICITATIONS_DU_JURY"`. |
| `comment` | string | no |  | Commentaire. |

### `declareCertificationFolderToRetake`

**Passer un dossier de certification à l’état : à repasser.** Transition a Wedof certification folder into the 'toRetake' state when the candidate must resit the exam, optionally recording the detailed result, European language level, re-exam dates, place, and type. Pick this for a retake rather than declaring success/failure outright; it follows the certification-folder state machine and is not idempotent. Requires the folder's externalId. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de certification. Sélectionner la propriété {externalId} du dossier de certification. |
| `detailedResult` | string | no |  | Détail du résultat de l'examen. |
| `europeanLanguageLevel` | string | no | `null` | Nomenclature européeenne pour les certifications de langues. One of `"C2"`, `"C1"`, `"B2"`, `"B1"`, `"A2"`, `"A1"`, `"INSUFFISANT"`. |
| `examinationDate` | ISO date-time string | no |  | Date de passage de l'examen. Date au format YYYY-MM-DD. |
| `examinationEndDate` | ISO date-time string | no |  | Date de fin de passage de l'examen. Date au format YYYY-MM-DD. |
| `examinationPlace` | string | no |  | Lieu de passage de l'examen. |
| `examinationType` | string | no | `null` | Type de passage de l'examen. One of `"A_DISTANCE"`, `"EN_PRESENTIEL"`, `"MIXTE"`. |
| `comment` | string | no |  | Commentaire. |

### `declareCertificationFolderFailed`

**Passer un dossier de certification à l’état : Échoué.** Transition a Wedof certification folder into the 'failed' state, optionally recording the detailed result, European language level, and a comment. Pick this when the candidate did not pass and will not resit; use 'toRetake' instead if a retake is planned. Follows the certification-folder state machine and is not idempotent. Requires the folder's externalId. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de certification. Sélectionner la propriété {externalId} du dossier de certification. |
| `detailedResult` | string | no |  | Détail du résultat de l'examen. |
| `europeanLanguageLevel` | string | no | `null` | Nomenclature européeenne pour les certifications de langues. One of `"C2"`, `"C1"`, `"B2"`, `"B1"`, `"A2"`, `"A1"`, `"INSUFFISANT"`. |
| `comment` | string | no |  | Commentaire. |

### `refuseCertificationFolder`

**Passer un dossier de certification à l’état : Refuser.** Transition a Wedof certification folder into the 'refused' state, optionally with a comment. Pick this to reject a certification enrollment request; distinct from 'abort', which marks an already-accepted folder as abandoned. Follows the certification-folder state machine and is not idempotent. Requires the folder's externalId. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de certification. Sélectionner la propriété {externalId} du dossier de certification. |
| `comment` | string | no |  | Commentaire. |

### `abortCertificationFolder`

**Passer un dossier de certification à l’état : Abandonné.** Transition a Wedof certification folder into the 'aborted' (abandoned) state, optionally with a comment. Pick this when the candidate withdraws or the certification process is given up; distinct from 'refuse', which rejects an enrollment request. Follows the certification-folder state machine and is not idempotent. Requires the folder's externalId. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de certification. Sélectionner la propriété {externalId} du dossier de certification. |
| `comment` | string | no |  | Commentaire. |

### `getCertificationFolderDocuments`

**Liste des documents d'un dossier de certification.** List the documents (files) attached to a single Wedof certification folder, identified by its externalId. Read-only and idempotent; returns the folder's file listing rather than the folder record itself. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de certification. Sélectionner la propriété {externalId} du dossier de certification. |

### `updateCertificationFolder`

**Mettre à jour un dossier de certification.** Update editable fields on an existing Wedof certification folder (e.g. enrollment/exam dates, exam type and place, funding type, access modality, tags, pricing, certificate details) without changing its state — use the dedicated declare/transition actions to move state. You choose which fields to write; only those are sent. Targets the folder by externalId and is an idempotent field write. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | string | yes |  | N° du dossier de certification. Sélectionner la propriété {externalId} du dossier de certification. |
| `fieldsToUpdate` | array | yes |  | Champs à mettre à jour. Sélectionner les champs que vous souhaitez mettre à jour. One of `"enrollmentDate"`, `"examinationDate"`, `"examinationEndDate"`, `"examinationPlace"`, `"examinationCenterZipCode"`, `"dataProvider"`, `"examinationType"`, `"verbatim"`, `"optionName"`, `"accessModality"`, `"accessModalityVae"`, `"comment"`, `"type"`, `"tags"`, `"cdcExcluded"`, `"amountHt"`, `"certificate"`, `"certificateId"`, `"tiersTemps"`, `"cdcTechnicalId"`, `"badgeAssertion"`. |
| `dynamicFields` | object | no |  | Champs sélectionnés. An object whose fields depend on other inputs; the product shows them. |

### `createCertificationFolder`

**Créer un dossier de certification hors CPF.** Create a new non-CPF Wedof certification folder linking an attendee to a certification, with funding type, registration initiative, access modality, tags, and custom metadata. Pick this to register a candidate for a certification outside the CPF channel. Each call creates a distinct folder, so it is not idempotent. Requires the certification's certifInfo and the attendee's id. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `certifInfo` | string | yes |  | N° du certification. Le certifInfo de la certification sélectionnée. |
| `attendeeId` | string | yes |  | L'ID de l'apprenant. ID de l'apprenant sélectionné. |
| `optionName` | string | no |  | Option si appliquée. |
| `enrollmentDate` | ISO date-time string | no |  | Date d'inscription à la certification. Date au format YYYY-MM-DD - peut être modifié dans les états toRegister, registered, toTake, toControl. |
| `dataProvider` | string | yes |  | Type de financement. Type de financement du dossier de certification. One of `"individual"`, `"opco"`, `"poleEmploi"`, `"company"`. |
| `type` | string | no |  | Dossier à l'initiative de. Initiative à laquelle l'inscription a été réalisée. One of `"CERTIFIE"`, `"OF"`, `"POLE_EMPLOI"`, `"EMPLOYEUR"`, `"AUTRE"`. |
| `accesModality` | string | no |  | accessModality. Si accessModality est de type VAE, accessModalityVae doit être déclaré. One of `"FORMATION_INITIALE_HORS_APPRENTISSAGE"`, `"FORMATION_INITIALE_APPRENTISSAGE"`, `"FORMATION_CONTINUE_HORS_CONTRAT_DE_PROFESSIONNALISATION"`, `"FORMATION_CONTINUE_CONTRAT_DE_PROFESSIONNALISATION"`, `"VAE"`, `"EQUIVALENCE_(DIPLOME_ETRANGER)"`, `"CANDIDAT_LIBRE"`. |
| `accesModalityVae` | string | no |  | accessModality Vae. Requis si la valeur accessModality est 'VAE'. One of `"CONGES_VAE"`, `"VAE_CLASSIQUE"`. |
| `tags` | array | no |  | Tags. Liste de tags associée au dossier de certification, uniquement pour le certificateur. |
| `metadata` | array | no |  | Données personnalisées. tableau associatif clé - valeur, disponible uniquement pour le certificateur. |

### `listActivitiesAndTasks`

**Liste de toutes les activités et tâches d'un dossier.** Lists all activities and tasks recorded on a single folder, which can be either a training (registration) folder or a certification folder selected via the folder-type input. Read-only and safe to repeat. Use to inspect the activity/task history of one specific folder by its number. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entityClass` | string | yes |  | Choisir le type de dossier. Permet de n'obtenir que les dossiers dans le type considéré - par défaut tous les types sont retournés. One of `"certificationFolders"`, `"registrationFolders"`. |
| `externalId` | string | yes |  | N° du dossier. Sélectionner la propriété {externalId} du dossier. |

### `createTask`

**Créer une tâche.** Create a task (activity) attached to a Wedof folder — a certification folder, registration folder, or commercial proposal — with title, optional due date, type, Qualiopi indicators, description, owner email, and link. Pick this to add a to-do/reminder against a specific record; each call creates a new task, so it is not idempotent. Requires the folder type (entityClass), the record's externalId, and the owner's email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entityClass` | string | yes |  | Choisir le type de dossier. Permet de n'obtenir que les dossiers dans le type considéré - par défaut tous les types sont retournés. One of `"CertificationFolder"`, `"RegistrationFolder"`, `"Proposal"`. |
| `externalId` | string | yes |  | N° du dossier. Sélectionner la propriété {externalId} du dossier. |
| `title` | string | yes |  | Titre de la tâche. |
| `dueDate` | ISO date-time string | no |  | Date d'échéance. Date au format YYYY-MM-DDTHH:mm:ssZ. |
| `type` | string | yes |  | Type de tâche. One of `"phone"`, `"email"`, `"meeting"`, `"chat"`, `"sms"`, `"training"`, `"remark"`, `"file"`. |
| `qualiopiIndicators` | string | no |  | Associée à Qualiopi. One of `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25` and 7 more. |
| `description` | string | no |  | Description. |
| `userEmail` | string | yes |  | Responsable (email de l'utilisateur). |
| `link` | string | no |  | Lien (url) vers la tâche. |

### `createActivitie`

**Créer une activité.** Create a new activity (task) on a Wedof file, identified by the file type (certification folder, registration/training folder, or commercial proposal) and its externalId. Each call appends a fresh activity, so it is not idempotent and repeated calls create duplicates. Requires a title, owner email, and start date. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entityClass` | string | yes |  | Choisir le type de dossier. Permet de n'obtenir que les dossiers dans le type considéré - par défaut tous les types sont retournés. One of `"CertificationFolder"`, `"RegistrationFolder"`, `"Proposal"`. |
| `externalId` | string | yes |  | N° du dossier. Sélectionner la propriété {externalId} du dossier. |
| `title` | string | yes |  | Titre de l'activité. |
| `type` | string | yes |  | Type de tâche. One of `"phone"`, `"email"`, `"meeting"`, `"chat"`, `"sms"`, `"training"`, `"remark"`, `"file"`. |
| `qualiopiIndicators` | string | no |  | Associée à Qualiopi. One of `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25` and 7 more. |
| `description` | string | no |  | Description. |
| `userEmail` | string | yes |  | Responsable (email de l'utilisateur). |
| `eventTime` | ISO date-time string | yes |  | Date de début. Date au format YYYY-MM-DDTHH:mm:ssZ. |
| `eventEndTime` | ISO date-time string | no |  | Date d'échéance. Date au format YYYY-MM-DDTHH:mm:ssZ. |
| `link` | string | no |  | Lien (url) vers la tâche. |

### `sendFile`

**Envoyer un fichier.** Uploads a document to a single folder (a training or certification folder selected via the folder-type input), provided as a direct file, a file URL, or a link to download. Not idempotent: each call adds a new document to the folder. Use to attach a file to one specific folder by its number. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entityClass` | string | yes |  | Choisir le type de dossier. Permet de n'obtenir que les dossiers dans le type considéré - par défaut tous les types sont retournés. One of `"certificationFolders"`, `"registrationFolders"`. |
| `externalId` | string | yes |  | N° du dossier. Sélectionner la propriété {externalId} du dossier. |
| `title` | string | no |  | Titre du fichier. |
| `typeId` | object | yes |  | Type du fichier. An object whose fields depend on other inputs; the product shows them. |
| `typeFile` | string | no | `"file"` | Choisir le format d'envoi du fichier. Permet de choisir la méthode d'envoi du fichier. One of `"file"`, `"fileUrl"`, `"url"`. |
| `files` | object | yes |  | ez. An object whose fields depend on other inputs; the product shows them. |

### `me`

**Récupérer mes informations.** Retrieve the profile and account details of the currently authenticated Wedof user (the owner of the API key). Takes no input; useful for confirming which account/connection is active or reading the user's identity. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

### `myOrganism`

**Récupérer mon organisme.** Retrieve the details of the Wedof organism (organization) tied to the authenticated API key. Takes no inputs; read-only and safe to retry. Use this to discover the current account/organization context before acting on its certifications or partnerships. Needs authentication.

Kind: read, safe to repeat.

No inputs.

### `addExecutionTag`

**Associer le run à wedof.** Tags the current workflow run with one or more Wedof folder numbers (training or certification), linking this execution to those folders in Wedof. Idempotent: re-adding the same folder numbers does not create duplicates. This makes no external API call; it only attaches run metadata. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `externalId` | array | yes | `[]` | Numéros de dossier. Entrez un ou plusieurs numéros de dossier à associer à cette exécution. |

### `getCertificationFolderSurvey`

**Récupération d'une enquête.** Retrieves the survey associated with a single certification folder, identified by the certification folder number (externalId). Read-only and safe to repeat. Use when you know the folder; to list surveys by criteria use the list-surveys action instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `certificationFolderExternalId` | string | yes |  | N° de dossier de certification. Sélectionner la propriété {externalId} du dossier de certification. |

### `listCertificationFolderSurveys`

**Liste les enquêtes selon des critères.** Lists the certification surveys belonging to the connected user's organization, filterable by certification (certifInfo) and survey state, with paging and sort order. Read-only and safe to repeat. Use to find surveys by criteria; to fetch the survey of one known certification folder use the get-survey action instead. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `certifInfo` | string | no |  | N° certifInfo. Permet de n'obtenir que les enquêtes liées à la certification considérée. |
| `limit` | string | no |  | Nombre d'enquêtes. Nombre d'éléments retourné par requête - par défaut 100. |
| `order` | string | no |  | Ordre. Tri les résultats par ordre ascendant ou descendant. One of `"asc"`, `"desc"`. |
| `page` | number | no | `1` | N° de page de la requête. Par défaut : 1. |
| `state` | string | no |  | Etat. Permet de n'obtenir que les enquêtes en fonction de l'état considéré. One of `"all"`, `"created"`, `"beforeCertificationSuccess"`, `"afterSixMonthsCertificationSuccess"`, `"finished"`. |

### `createCertificationPartnerAudit`

**Créer un audit sur un partenariat de certification.** Create an audit on a single certification partnership in Wedof, using an audit template chosen from those available for the certification. Pick this to audit one specific partner identified by SIRET; use create-general-audit to audit all active partners of a certification at once. Each call creates a new audit, so it is not idempotent. Requires the certification's certifInfo, the partner's SIRET, and a template id. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `certifInfo` | string | yes |  | N° certifInfo. Permet de n'obtenir que les modèles liés à la certification considérée. |
| `siret` | string | yes |  | N° de siret. Sélectionner le SIRET du partenaire. |
| `templateId` | object | yes |  | Type du modèle d'audit. An object whose fields depend on other inputs; the product shows them. |

### `createGeneralAudit`

**Générer un audit général sur les partenaires d'une certification.** Generate (and optionally auto-close) an audit for every active partnership of a Wedof certification in one bulk operation, with options to update each partner's compliance and auto-suspend non-compliant partners. Pick this for a certification-wide sweep; use create-certification-partner-audit to audit a single partner by SIRET. Each call creates new audits, so it is not idempotent. Requires the certification's certifInfo and an audit template id. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `certifInfo` | string | yes |  | N° certifInfo. Permet de n'obtenir que les partenariats liés à la certification considérée. |
| `templateId` | object | yes |  | Type du modèle d'audit. An object whose fields depend on other inputs; the product shows them. |
| `complete` | string | no | `true` | Clôturer les audits automatiquement. Indique si l'audit doit être clôturer. One of `false`, `true`. |
| `updateCompliance` | string | no | `true` | Mettre à jour la conformité du partenariat. Indique si il faut mettre à jour la conformité du partenariat. One of `false`, `true`. |
| `suspend` | string | no | `true` | Suspendre automatiquement le partenariat en cas de non-conformité. Indique si le partenariat doit être suspendu en cas de non-conformité (ne s'applique que pour les certifications actives) One of `false`, `true`. |

### `getPartnership`

**Récupération d'un partenariat.** Look up a single certification partnership by the certification certifInfo and the partner SIRET number. Read-only and safe to retry; pick this when you already know both identifiers and need the current partnership record. To remove a partnership use the delete action instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `certifInfo` | string | yes |  | N° certifInfo. Sélectionner le {certifInfo} de la certification considérée. |
| `siret` | string | yes |  | N° Siret. Sélectionner le {siret} du partenaire. |

### `updatePartnership`

**Mettre à jour le partenariat.** Update an existing Wedof certification partnership, identified by the certification's certifInfo and the partner's SIRET. You select which fields to change (state, habilitation, compliance, comment, pending activation/revocation/suspension flags, amount, tags, metadata, training zones, skill sets); only those are sent. Idempotent field write, not a create — use create-partnership to establish a new partnership. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `certifInfo` | string | yes |  | N° certifInfo. Sélectionner le {certifInfo} de la certification considérée. |
| `siret` | string | yes |  | N° Siret. Sélectionner le {siret} du partenaire. |
| `fieldsToUpdate` | array | yes |  | Champs à mettre à jour. Sélectionner les champs que vous souhaitez mettre à jour. One of `"state"`, `"habilitation"`, `"comment"`, `"pendingActivation"`, `"pendingRevocation"`, `"pendingSuspension"`, `"amountHt"`, `"compliance"`, `"tags"`, `"metadata"`, `"trainingsZone"`, `"skillSets"`. |
| `dynamicFields` | object | no |  | Champs sélectionnés. An object whose fields depend on other inputs; the product shows them. |

### `deletePartnership`

**Supprimer un partenariat.** Permanently delete a certification partnership (identified by certification certifInfo and partner SIRET). The API only allows deletion while the partnership is in the 'request to complete' state, so it may fail otherwise. Destructive and not idempotent; use the get action to inspect a partnership and the reset action to revert its state instead. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `certifInfo` | string | yes |  | N° certifInfo. Sélectionner le {certifInfo} de la certification considérée. |
| `siret` | string | yes |  | N° Siret. Sélectionner le {siret} du partenaire. |

### `listPartnerships`

**Lister les partenariats.** List the training-organization partnerships of a Wedof certification, with filters for certifier SIRET, access state, compliance, connection issues, free-text query, plus sorting and pagination. Pick this to discover partners or find a partnership's SIRET for a certification. Read-only and idempotent. Requires the certification's certifInfo. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `certifInfo` | string | yes |  | N° certifInfo. Identifiant de la certification. |
| `certifier` | string | no |  | N° Siret Certificateur. |
| `certifierAccessState` | string | no |  | État d'accès du certificateur. One of `"all"`, `"waiting"`, `"accepted"`, `"refused"`, `"terminated"`, `"none"`. |
| `compliance` | string | no |  | Conformité. One of `"all"`, `"compliant"`, `"partiallyCompliant"`, `"nonCompliant"`, `"inProgress"`. |
| `connectionIssue` | boolean | no |  | Problème de connexion. |
| `limit` | number | no | `100` | Limite. Nombre maximal de résultats à retourner - 100 par défault. |
| `order` | string | no |  | Ordre. One of `"asc"`, `"desc"`. |
| `page` | number | no | `1` | Page. Numéro de la page de résultats - 1 par défault. |
| `query` | string | no |  | Requête de recherche. |
| `sort` | string | no | `"name"` | Trier par. One of `"name"`, `"state"`. |
| `state` | string | no | `"all"` | État. One of `"processing"`, `"active"`, `"aborted"`, `"refused"`, `"suspended"`, `"revoked"`, `"all"`. |

### `createPartnership`

**Créer un partenariat.** Create a new partnership between a Wedof certification and a training organization identified by its SIRET. Pick this to request/establish a partner relationship; use update-partnership to modify an existing one. Requires the certification's certifInfo and the partner's SIRET, and is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `certifInfo` | string | yes |  | N° certifInfo. Sélectionner le {certifInfo} de la certification considérée. |
| `siret` | string | yes |  | N° siret. Le numéro SIRET du partenaire. |

### `resetPartnership`

**Réinitialiser un partenariat.** Reset an existing certification partnership (identified by certification certifInfo and partner SIRET) back to the 'request being processed' state. This mutates the partnership's status, so do not use it merely to read the record (use the get action) or to remove it (use the delete action). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `certifInfo` | string | yes |  | N° certifInfo. Identifiant de la certification. |
| `siret` | string | yes |  | N° siret. Numéro SIRET du partenaire à réinitialiser. |
