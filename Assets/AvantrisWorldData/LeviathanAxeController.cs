using UnityEngine;

public class LeviathanAxeController : MonoBehaviour
{
    [Header("Axe Settings")]
    public float throwForce = 30f;
    public float recallTime = 1f;
    public float rotationSpeed = 500f;
    
    [Header("References")]
    public Rigidbody axeRigidbody;
    public Transform playerHandSocket;
    public Transform curveControlPoint; // Control node offset to produce curved Bezier path

    private bool isFlying = false;
    private bool isRecalling = false;
    private float recallProgress = 0f;
    private Vector3 recallStartPos;

    void Update()
    {
        // Left click throws the weapon
        if (Input.GetMouseButtonDown(0) && !isFlying && !isRecalling)
        {
            ThrowAxe();
        }
        // Right click pulls/recalls it back
        else if (Input.GetMouseButtonDown(1) && isFlying && !isRecalling)
        {
            StartRecall();
        }
        
        if (isFlying && !isRecalling)
        {
            transform.Rotate(Vector3.right, rotationSpeed * Time.deltaTime);
        }
        
        if (isRecalling)
        {
            HandleRecallMovement();
        }
    }

    void ThrowAxe()
    {
        isFlying = true;
        axeRigidbody.isKinematic = false;
        axeRigidbody.transform.parent = null;
        axeRigidbody.AddForce(playerHandSocket.forward * throwForce, ForceMode.Impulse);
    }

    void StartRecall()
    {
        isRecalling = true;
        axeRigidbody.isKinematic = true; // Suspend gravity/physics while returning
        recallProgress = 0f;
        recallStartPos = transform.position;
    }

    void HandleRecallMovement()
    {
        recallProgress += Time.deltaTime / recallTime;
        
        if (recallProgress >= 1.0f)
        {
            FinishRecall();
        }
        else
        {
            // Quadratic Bezier Curve calculation
            Vector3 p0 = recallStartPos;
            Vector3 p1 = curveControlPoint.position;
            Vector3 p2 = playerHandSocket.position;
            
            float t = recallProgress;
            Vector3 targetPosition = Mathf.Pow(1 - t, 2) * p0 + 2 * (1 - t) * t * p1 + Mathf.Pow(t, 2) * p2;
            
            transform.position = targetPosition;
            transform.Rotate(Vector3.right, -rotationSpeed * Time.deltaTime);
        }
    }

    void FinishRecall()
    {
        isRecalling = false;
        isFlying = false;
        transform.position = playerHandSocket.position;
        transform.rotation = playerHandSocket.rotation;
        transform.parent = playerHandSocket;
    }

    private void OnCollisionEnter(Collision collision)
    {
        if (isFlying && !isRecalling)
        {
            // Stick to the wall/surface hit
            isFlying = false;
            axeRigidbody.isKinematic = true;
            transform.parent = collision.transform;
        }
    }
}
