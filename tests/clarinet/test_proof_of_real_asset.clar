;; Clarinet-style unit tests for proof-of-real-asset.clar
;; Place this file under tests/clarinet and run `clarinet test` in the project root.

(define-test test-mint-proof
  (let ((deployer tx-sender))
    ;; Simulate minting a proof from the deploying account
    (begin
      (var-set proof-count u0)
      (let ((result (mint-proof (buff "gold") (buff "QmTestCid123") u80 deployer)))
        (match result
          id
          (begin
            ;; After mint, proof-count should be 1 and get-proof should return the stored entry
            (asserts! (is-eq (var-get proof-count) u1) (err u300))
            (let ((entry (get-proof u0)))
              (asserts! (is-some entry) (err u301))
              (ok true)))
          (err e (err e)))))))

(define-test test-revoke-proof-by-issuer
  (let ((issuer tx-sender))
    (begin
      ;; First mint as issuer
      (var-set proof-count u0)
      (let ((mint-res (mint-proof (buff "property") (buff "QmCidRevoke") u75 issuer)))
        (match mint-res
          id
          (begin
            ;; Revoke by issuer should succeed
            (let ((revoke-res (revoke-proof u0)))
              (match revoke-res
                b
                (begin
                  (asserts! b (err u302))
                  (let ((entry (get-proof u0)))
                    (match entry
                      e
                      (begin
                        (asserts! (get revoked e) true (err u303))
                        (ok true))
                      (err u304)))))
                (err u305))))))))
