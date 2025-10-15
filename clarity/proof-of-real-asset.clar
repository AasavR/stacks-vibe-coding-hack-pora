;; proof-of-real-asset.clar
(define-non-fungible-token proof-token uint)

(define-data-var proof-count uint u0)

(define-map proofs
  ((id uint))
  ((owner principal) (issuer principal) (asset-type (buff 32)) (ipfs-cid (buff 64)) (verification-score uint) (revoked bool) (timestamp uint)))

(define-public (mint-proof (asset-type (buff 32)) (ipfs-cid (buff 64)) (score uint) (issuer principal))
  (begin
    (let ((id (var-get proof-count)))
      (map-set proofs
        ((id id))
        ((owner tx-sender)
         (issuer issuer)
         (asset-type asset-type)
         (ipfs-cid ipfs-cid)
         (verification-score score)
         (revoked false)
         (timestamp (get block-height))))
      (var-set proof-count (+ id u1))
      (match (nft-mint? proof-token id tx-sender)
        mint
        (ok id)
        (err e)))))

(define-public (revoke-proof (id uint))
  (begin
    (let ((entry (map-get? proofs ((id id)))))
      (match entry
        proof
        (begin
          ;; only issuer or owner can revoke
          (asserts! (or (is-eq (get issuer proof) tx-sender) (is-eq (get owner proof) tx-sender)) (err u100))
          (map-set proofs ((id id))
            ((owner (get owner proof))
             (issuer (get issuer proof))
             (asset-type (get asset-type proof))
             (ipfs-cid (get ipfs-cid proof))
             (verification-score (get verification-score proof))
             (revoked true)
             (timestamp (get timestamp proof))))
          (ok true))
        (err u101)))))

(define-read-only (get-proof (id uint))
  (map-get? proofs ((id id))))

(define-read-only (get-proof-count)
  (var-get proof-count))
